import { Component, Player, Vec3, CodeBlockEvents } from 'horizon/core';
import LocalCamera from 'horizon/camera';

// See World_OwnershipManagement to manage ownership 
// This script must be set to "Local" execution mode in the editor.
class TopDownCamera extends Component<typeof TopDownCamera> {
    private owner?: Player;

    private serverPlayer?: Player;

    preStart() {
        // The player will own the entity when it is grabbed
        this.owner = this.entity.owner.get();

        this.serverPlayer = this.world.getServerPlayer();

        // Check if the entity is owned by a player
        if (this.owner === this.serverPlayer) {
            // The entity is owned by the server player, so end the script
            return;
        }

        this.connectCodeBlockEvent(this.entity, CodeBlockEvents.OnPlayerEnterTrigger, this.onPlayerEnterTrigger.bind(this));
    }

    start() {}

    onPlayerEnterTrigger(player: Player) {
        LocalCamera.setCameraModePan({
            positionOffset: new Vec3(0, 10, 3) // Set the camera 10 meters above, and 3 meters forward from the default third person camera position
        });
    }
}
Component.register(TopDownCamera);