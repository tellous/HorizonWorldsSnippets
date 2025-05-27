import { UIComponent, Pressable, Text, Binding } from 'horizon/ui';
import { Color, Player } from 'horizon/core';

class ButtonUI extends UIComponent<typeof ButtonUI> {
    private hoverColor = Color.white;

    private pressedColor = new Color(0, 1, 1);

    private defaultColor = Color.green;

    private buttonColorBinding = new Binding(this.defaultColor);

    preStart() {}

    start() {}

    initializeUI() {
        return Pressable({
            children: Text({
                text: "Click Me",
                style: {
                    color: 'black',
                    textAlign: 'center',
                    textAlignVertical: 'center'
                }
            }),
            onPress: () => { this.buttonColorBinding.set(this.pressedColor) },
            onRelease: () => { this.buttonColorBinding.set(this.defaultColor) },
            onClick: (player: Player) => { console.log(`Button clicked by ${player.name.get()}`); },
            onEnter: () => { this.buttonColorBinding.set(this.hoverColor) },
            onExit: () => { this.buttonColorBinding.set(this.defaultColor) },
            style: {
                backgroundColor: this.buttonColorBinding,
                width: 150,
                height: 50,
            }
        });
    }
}
UIComponent.register(ButtonUI);
