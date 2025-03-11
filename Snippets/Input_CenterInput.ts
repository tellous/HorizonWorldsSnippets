import * as hz from 'horizon/core';

// See World_OwnershipManagement to manage ownership 
// This script must be set to "Local" execution mode in the editor.
class CenterInput extends hz.Component<typeof CenterInput> {
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

        // Register a callback for the X button in VR, T key in Desktop
        const input = hz.PlayerControls.connectLocalInput(hz.PlayerInputAction.LeftPrimary, hz.ButtonIcon.None, this,{
            preferredButtonPlacement: hz.ButtonPlacement.Default,
        });

        input.registerCallback((action: hz.PlayerInputAction, pressed: boolean) => {
            if (pressed) {
                console.log("Button pressed");
            } else {
                console.log("Button released");
            }
        });
    }
}

hz.Component.register(CenterInput);