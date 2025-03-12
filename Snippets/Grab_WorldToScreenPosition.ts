import * as hz from 'horizon/core';
import LocalCamera from 'horizon/camera';

// See World_OwnershipManagement to manage ownership 
// This script must be set to "Local" execution mode in the editor.
class WorldToScreenPosition extends hz.Component<typeof WorldToScreenPosition> {
    private owner?: hz.Player;

    private serverPlayer?: hz.Player;

    start() {
        this.owner = this.entity.owner.get();

        this.serverPlayer = this.world.getServerPlayer();

        if (this.owner === this.serverPlayer) {
            // The entity is owned by the server player, so end the script
            return;
        }

        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnGrabStart,
            this.OnGrab.bind(this)
        );
    }

    private OnGrab(isRightHand: boolean, player: hz.Player) {
        const position = this.entity.position.get();

        LocalCamera.convertWorldToScreenPoint(position);
        
        console.log("WorldToScreenPosition", position);
    }
}

hz.Component.register(WorldToScreenPosition);