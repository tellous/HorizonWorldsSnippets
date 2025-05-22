import { Component, Player } from 'horizon/core';

// See World_OwnershipManagement to manage ownership 
// This script must be set to "Local" execution mode in the editor.
class StartFocusedInteraction extends Component<typeof StartFocusedInteraction> {
    private owner?: Player;
    private serverPlayer?: Player;

    preStart() {
        this.owner = this.entity.owner.get();
        this.serverPlayer = this.world.getServerPlayer();
        if (this.owner === this.serverPlayer) {
            // The entity is owned by the server player, so end the script
            return;
        }
        this.owner.enterFocusedInteractionMode();
    }

    start() {}
}

Component.register(StartFocusedInteraction);