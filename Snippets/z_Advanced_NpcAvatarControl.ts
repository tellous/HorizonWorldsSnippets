import * as hz from 'horizon/core';
import * as hznpc from 'horizon/avatar_ai_agent';
import LocalCamera from 'horizon/camera';

// There at 2 classes in this file
// AvatarControl and PlayerController
// AvatarControl should be set to "Default" execution mode in the editor
// PlayerController should be set to "Local" execution mode in the editor
// Use an Ownership Management script to manage ownership of the PlayerController

const SpawnEvent = new hz.NetworkEvent('Spawn');

const MoveEvent = new hz.NetworkEvent<{ direction: hz.Vec3 }>('Move');

const AttachEvent = new hz.NetworkEvent<{ player: hz.Player }>('Attach');

// This script must be set to "Default" execution mode in the editor.
class NpcAvatarControl extends hz.Component<typeof NpcAvatarControl> {
    private agent?: hznpc.AvatarAIAgent;

    private moveDirection = hz.Vec3.zero;

    start() {
        // Get the NPC agent reference
        this.agent = this.entity.as(hznpc.AvatarAIAgent);

        // Connect update event for continuous movement
        this.connectLocalBroadcastEvent(
            hz.World.onUpdate,
            this.onUpdate.bind(this)
        );

        this.connectNetworkBroadcastEvent(
            SpawnEvent,
            this.onSpawnPlayer.bind(this)
        );

        this.connectNetworkBroadcastEvent(
            MoveEvent,
            this.onMoveEvent.bind(this)
        );
    }

    private async onSpawnPlayer() {
        const result = await this.agent?.spawnAgentPlayer();

        if (result === hznpc.AgentSpawnResult.Success) {
            const player = this.agent?.agentPlayer.get();

            if (player) {
                this.sendNetworkBroadcastEvent(AttachEvent, { player: player });
            }
        }
    }

    private onMoveEvent(event: { direction: hz.Vec3 }) {
        // Update the direction based on the network event
        this.moveDirection = event.direction;
    }

    private onUpdate(data: { deltaTime: number }) {
        if (!this.agent) return;

        // If any movement input is active, move the NPC
        if (this.moveDirection.magnitude() > 0) {
            const player = this.agent?.agentPlayer.get();

            if (!player) return;

            const currentPosition = player.position.get();
            const newPosition = currentPosition.add(this.moveDirection);

            // Use the agent's locomotion to move to the new position
            this.agent.locomotion.moveToPosition(newPosition,{
                travelTime: 0.5, // Adjust the travel time as needed
            });

            this.agent.locomotion.rotateTo(this.moveDirection,{
                rotationTime: 0.001, // Adjust the rotation time as needed
            });
        } else if (this.agent.locomotion.isMoving.get()) {
            // Stop movement if no input is active
            this.agent.locomotion.stopMovement();

        }
    }
}
hz.Component.register(NpcAvatarControl);


// Move this class to its own file
// See World_OwnershipManagement to manage ownership 
// This script must be set to "Local" execution mode in the editor.
class PlayerController extends hz.Component<typeof PlayerController> {
    private owner?: hz.Player;

    private serverPlayer?: hz.Player;

    private agent?: hznpc.AvatarAIAgent;

    private isMovingForward = false;

    private isMovingBackward = false;

    private isMovingLeft = false;

    private isMovingRight = false;

    start() {
        // Initialize owner and server player references
        this.owner = this.entity.owner.get();
        
        this.serverPlayer = this.world.getServerPlayer();

        // Check if the entity is owned by a player
        if (this.owner === this.serverPlayer) {
            // The entity is owned by the server player, so end the script
            return;
        }

        // Get the NPC agent reference
        this.agent = this.entity.as(hznpc.AvatarAIAgent);

        // Forward movement (W key in Desktop, Thumbstick forward in VR)
        const forwardInput = hz.PlayerControls.connectLocalInput(
            hz.PlayerInputAction.LeftXAxis,
            hz.ButtonIcon.None,
            this
        );

        forwardInput.registerCallback((action: hz.PlayerInputAction, pressed: boolean) => {
            this.isMovingForward = pressed;
        });

        // Backward movement (S key in Desktop, Thumbstick backward in VR)
        const backwardInput = hz.PlayerControls.connectLocalInput(
            hz.PlayerInputAction.LeftYAxis,
            hz.ButtonIcon.None,
            this
        );

        backwardInput.registerCallback((action: hz.PlayerInputAction, pressed: boolean) => {
            this.isMovingBackward = pressed;
        });

        // Connect update event for continuous movement
        this.connectLocalBroadcastEvent(
            hz.World.onUpdate,
            this.onUpdate.bind(this)
        );
    }

    private onUpdate(data: { deltaTime: number }) {
        if (!this.agent) return;

        // Calculate movement direction based on input
        const moveDirection = this.calculateMoveDirection();

        // If any movement input is active, move the NPC
        if (moveDirection.magnitude() > 0) {
            const currentPosition = this.agent.position.get();
            const newPosition = currentPosition.add(moveDirection);

            // Use the agent's locomotion to move to the new position
            this.agent.locomotion.moveToPosition(newPosition);
        }
    }

    private calculateMoveDirection(): hz.Vec3 {
        // Get the camera's forward and right vectors for movement relative to camera
        const cameraForward = LocalCamera.forward.get().componentMul(new hz.Vec3(1, 0, 1)).normalize();
        const cameraRight = cameraForward.cross(hz.Vec3.up);

        let moveDirection = hz.Vec3.zero;

        if (this.isMovingForward) {
            moveDirection = moveDirection.add(cameraForward);
        }
        if (this.isMovingBackward) {
            moveDirection = moveDirection.sub(cameraForward);
        }
        if (this.isMovingRight) {
            moveDirection = moveDirection.add(cameraRight);
        }
        if (this.isMovingLeft) {
            moveDirection = moveDirection.sub(cameraRight);
        }

        // Normalize the direction if it has magnitude
        if (moveDirection.magnitude() > 0) {
            moveDirection = moveDirection.normalize();
        }

        return moveDirection;
    }
}

hz.Component.register(PlayerController);