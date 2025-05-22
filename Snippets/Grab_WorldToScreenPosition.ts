import { Component, Player, CodeBlockEvents } from 'horizon/core';
import LocalCamera from 'horizon/camera';

// See World_OwnershipManagement to manage ownership 
// This script must be set to "Local" execution mode in the editor.
class WorldToScreenPosition extends Component<typeof WorldToScreenPosition> {
    private owner?: Player;

    private serverPlayer?: Player;

    preStart() {
        this.owner = this.entity.owner.get();

        this.serverPlayer = this.world.getServerPlayer();

        if (this.owner === this.serverPlayer) {
            // The entity is owned by the server player, so end the script
            return;
        }

        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnGrabStart,
            this.OnGrab.bind(this)
        );
    }

    start() {}

    private OnGrab(isRightHand: boolean, player: Player) {
        const position = this.entity.position.get();

        LocalCamera.convertWorldToScreenPoint(position);
        
        console.log("WorldToScreenPosition", position);
    }
}

Component.register(WorldToScreenPosition);