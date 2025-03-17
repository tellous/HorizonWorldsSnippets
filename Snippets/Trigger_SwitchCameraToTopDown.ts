import * as hz from 'horizon/core';
import LocalCamera, * as hzcam from 'horizon/camera';

// See World_OwnershipManagement to manage ownership 
// This script must be set to "Local" execution mode in the editor.
class TopDownCamera extends hz.Component<typeof TopDownCamera> {
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

        this.connectCodeBlockEvent(this.entity, hz.CodeBlockEvents.OnPlayerEnterTrigger, this.onPlayerEnterTrigger.bind(this));
    }

    onPlayerEnterTrigger(player: hz.Player) {
        LocalCamera.setCameraModePan({
            positionOffset: new hz.Vec3(0, 10, 3) // Set the camera 10 meters above, and 3 meters forward from the default third person camera position
        });
    }
}
hz.Component.register(TopDownCamera);