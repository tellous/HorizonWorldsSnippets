import * as hz from 'horizon/core';

// This script must be set to "Local" execution mode in the editor.
class CustomInput extends hz.Component<typeof CustomInput> {
    start() {
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

hz.Component.register(CustomInput);