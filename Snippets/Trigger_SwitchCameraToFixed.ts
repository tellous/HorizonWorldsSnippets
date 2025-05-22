import { Component, Player, CodeBlockEvents } from 'horizon/core';
import LocalCamera from 'horizon/camera';

// See World_OwnershipManagement to manage ownership 
// This script must be set to "Local" execution mode in the editor.
class SwitchCameraToFixed extends Component<typeof SwitchCameraToFixed> {
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

    private onPlayerEnterTrigger() {
        LocalCamera.setCameraModeFixed();
    }
}
Component.register(SwitchCameraToFixed);