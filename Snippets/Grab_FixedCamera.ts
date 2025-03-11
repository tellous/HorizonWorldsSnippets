import * as hz from 'horizon/core';
import LocalCamera, * as hzcam from 'horizon/camera';

// See World_OwnershipManagement to manage ownership 
// This script must be set to "Local" execution mode in the editor.
class FixedCamera extends hz.Component<typeof FixedCamera> {
    private owner?: hz.Player;

    private serverPlayer?: hz.Player;

    start() {
        // The player will own the entity when it is grabbed
        this.owner = this.entity.owner.get();

        this.serverPlayer = this.world.getServerPlayer();

        // Check if the entity is owned by a player
        if (this.owner === this.serverPlayer) {
            // The entity is owned by the server player, so end the script
            return;
        }

        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnGrabStart,
            this.onGrab.bind(this)
        );

        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnGrabEnd,
            this.onRelease.bind(this)
        );
    }

    private onGrab() {
        // Set the camera mode to first person when the entity is grabbed
        LocalCamera.setCameraModeFixed({ position: hz.Vec3.zero });
    }

    private onRelease() {
        // Set the camera mode back to third person when the entity is released
        LocalCamera.setCameraModeThirdPerson();

        // Reset the owner
        this.entity.owner.set(this.serverPlayer!);
    }
}
hz.Component.register(FixedCamera);