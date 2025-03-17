import * as hz from 'horizon/core';
import LocalCamera, * as hzcam from 'horizon/camera';

// See World_OwnershipManagement to manage ownership 
// This script must be set to "Local" execution mode in the editor.
class ClickAndDragCamera extends hz.Component<typeof ClickAndDragCamera> {
    private owner?: hz.Player;

    private serverPlayer?: hz.Player;

    private isDragging = false;

    private lastInteractionPoint = new hz.Vec3(0, 0, 0);

    private panSpeed = 500; // Adjust this for faster/slower camera movement

    private downRotation = hz.Quaternion.lookRotation(hz.Vec3.down, hz.Vec3.up);

    start() {
        // The player will own the entity when it is grabbed
        this.owner = this.entity.owner.get();
        this.serverPlayer = this.world.getServerPlayer();

        // Check if the entity is owned by a player
        if (this.owner === this.serverPlayer) {
            // The entity is owned by the server player, so end the script
            return;
        }

        // Set initial camera position
        LocalCamera.setCameraModeFixed({
            position: new hz.Vec3(0, 20, 0),
            rotation: this.downRotation
        });

        // Enter focused interaction mode to capture inputs
        this.owner.enterFocusedInteractionMode();

        // Connect events for interaction
        this.connectLocalBroadcastEvent(
            hz.PlayerControls.onFocusedInteractionInputStarted,
            this.onFocusedInteractionInputStarted.bind(this)
        );

        this.connectLocalBroadcastEvent(
            hz.PlayerControls.onFocusedInteractionInputMoved,
            this.onFocusedInteractionInputMoved.bind(this)
        );

        this.connectLocalBroadcastEvent(
            hz.PlayerControls.onFocusedInteractionInputEnded,
            this.onFocusedInteractionInputEnded.bind(this)
        );
    }

    private onFocusedInteractionInputStarted(data: { interactionInfo: hz.InteractionInfo[] }) {
        // Start dragging and store initial position
        this.isDragging = true;
        this.lastInteractionPoint = data.interactionInfo[0].screenPosition;
    }

    private onFocusedInteractionInputMoved(data: { interactionInfo: hz.InteractionInfo[] }) {
        if (!this.isDragging) {
            return;
        }

        // Calculate movement delta from last position
        const deltaX = data.interactionInfo[0].screenPosition.x - this.lastInteractionPoint.x;
        const deltaY = data.interactionInfo[0].screenPosition.y - this.lastInteractionPoint.y;

        let cameraPosition = LocalCamera.position.get();

        // Update camera position based on drag direction
        // Invert X movement for natural feeling (drag right moves camera left)
        cameraPosition = new hz.Vec3(
            cameraPosition.x - deltaX * this.panSpeed,
            cameraPosition.y,
            cameraPosition.z - deltaY * this.panSpeed
        );

        // Apply the new camera position
        LocalCamera.setCameraModeFixed({
            position: cameraPosition,
            rotation: this.downRotation,
            duration: 0.1,
            easing: hzcam.Easing.Linear
        });

        // Update the last position for next movement
        this.lastInteractionPoint = data.interactionInfo[0].screenPosition;
    }

    private onFocusedInteractionInputEnded(data: { interactionInfo: hz.InteractionInfo[] }) {
        if (data.interactionInfo.length === 0) {
            // End dragging
            this.isDragging = false;
        }
    }
}

hz.Component.register(ClickAndDragCamera);