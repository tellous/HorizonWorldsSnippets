import * as hzui from 'horizon/ui';
import * as hz from 'horizon/core';

export class ButtonUI extends hzui.UIComponent<typeof ButtonUI> {
    private hoverColor = hz.Color.white;

    private defaultColor = hz.Color.green;

    private buttonColorBinding = new hzui.Binding(this.defaultColor);

    initializeUI() {
        return hzui.Pressable({
            children: hzui.Text({
                text: "Click Me",
                style: {
                    color: 'black',
                    textAlign: 'center',
                    textAlignVertical: 'center'
                }
            }),
            onClick: (player: hz.Player) => { console.log(`Button clicked by ${player.name.get()}`); },
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
hzui.UIComponent.register(ButtonUI);
