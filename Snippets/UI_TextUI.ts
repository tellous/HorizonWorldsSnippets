import { UIComponent, View, Text } from 'horizon/ui';

export class TextUI extends UIComponent<typeof TextUI> {
    preStart() {}
    start() {}

    public initializeUI() {
        return View({
            children: [
                Text({
                    text: "Hello World!",
                })
            ],
            style: {
                flex: 1
            }
        });
    }
}
UIComponent.register(TextUI);
