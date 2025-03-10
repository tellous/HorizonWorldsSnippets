import * as hzui from 'horizon/ui';

export class TextUI extends hzui.UIComponent<typeof TextUI> {
    initializeUI() {
        return hzui.View({
            children: [
                hzui.Text({
                    text: "Hello World!",
                })
            ],
            style: {
                flex: 1
            }
        });
    }
}
hzui.UIComponent.register(TextUI);
