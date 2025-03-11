import * as hz from 'horizon/core';

// See World_OwnershipManagement to manage ownership 
// This script must be set to "Local" execution mode in the editor.
class ControllerInput extends hz.Component<typeof ControllerInput> {
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

        // Register a callback for the right trigger button in VR, Left mouse button in Desktop
        const input = hz.PlayerControls.connectLocalInput(hz.PlayerInputAction.RightTrigger, hz.ButtonIcon.None, this);

        input.registerCallback((action: hz.PlayerInputAction, pressed: boolean) => {
            if (pressed) {
                console.log("Right Trigger pressed");
            } else {
                console.log("Right Trigger released");
            }
        });
    }
}

hz.Component.register(ControllerInput);