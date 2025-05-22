import { Component, Player, PlayerControls, PlayerInputAction, ButtonIcon } from 'horizon/core';

// See World_OwnershipManagement to manage ownership 
// This script must be set to "Local" execution mode in the editor.
class ControllerInput extends Component<typeof ControllerInput> {
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

        // Register a callback for the right trigger button in VR, Left mouse button in Desktop
        const input = PlayerControls.connectLocalInput(PlayerInputAction.RightTrigger, ButtonIcon.None, this);

        input.registerCallback((action: PlayerInputAction, pressed: boolean) => {
            if (pressed) {
                console.log("Right Trigger pressed");
            } else {
                console.log("Right Trigger released");
            }
        });
    }

    start() {
        // Intentionally left blank
    }
}

Component.register(ControllerInput);