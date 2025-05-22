import { Component, Player, PlayerControls, PlayerInputAction, ButtonIcon, ButtonPlacement } from 'horizon/core';

// See World_OwnershipManagement to manage ownership 
// This script must be set to "Local" execution mode in the editor.
class CenterInput extends Component<typeof CenterInput> {
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

        // Register a callback for the X button in VR, T key in Desktop
        const input = PlayerControls.connectLocalInput(PlayerInputAction.LeftPrimary, ButtonIcon.None, this,{
            preferredButtonPlacement: ButtonPlacement.Default,
        });

        input.registerCallback((action: PlayerInputAction, pressed: boolean) => {
            if (pressed) {
                console.log("Button pressed");
            } else {
                console.log("Button released");
            }
        });
    }

    start() {
        // Intentionally left blank
    }
}

Component.register(CenterInput);