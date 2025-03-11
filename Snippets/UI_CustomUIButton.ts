import * as hz from 'horizon/core';
import * as hzui from 'horizon/ui';

// See World_OwnershipManagement to manage ownership 
// This script must be set to "Local" execution mode in the editor.
// Custom UI must be set to "Screen Overlay" and "Interactive, Non blocking" in the editor
class CustomUIButton extends hzui.UIComponent<typeof CustomUIButton> {
    private owner?: hz.Player;

    private serverPlayer?: hz.Player;

    private hoverColor = "white";

    private pressedColor = "yellow";

    private defaultColor = "gray";

    private buttonColorBinding = new hzui.Binding(this.defaultColor);

    start() {
        // The player will own the entity when it is grabbed
        this.owner = this.entity.owner.get();

        this.serverPlayer = this.world.getServerPlayer();

        // Check if the entity is owned by a player
        if (this.owner === this.serverPlayer) {
            // The entity is owned by the server player, so end the script
            return;
        }

        // Removes some of the default buttons from the UI
        hz.PlayerControls.disableSystemControls();
    }

    initializeUI() {
        return hzui.View({
            children: [
                hzui.Pressable({
                    children: [
                        hzui.Text({
                            text: "Press me",
                            style: {
                                fontSize: 12
                            }
                        }),
                    ],
                    onPress: () => { this.buttonColorBinding.set(this.pressedColor) },
                    onRelease: () => { this.buttonColorBinding.set(this.defaultColor) },
                    onEnter: () => { this.buttonColorBinding.set(this.hoverColor) },
                    onExit: () => { this.buttonColorBinding.set(this.defaultColor) },
                    onClick: () => {
                        console.log("Button clicked");
                    },
                    style: {
                        width: 100,
                        height: 100,
                        borderRadius: 50,
                        backgroundColor: this.buttonColorBinding,
                        margin: 30,
                        justifyContent: "center",
                        alignItems: "center",
                    },
                }),
            ],
            style: {
                flex: 1,
                justifyContent: "flex-end",
                alignItems: "flex-end"
            },
        })
    }
}

hzui.UIComponent.register(CustomUIButton);