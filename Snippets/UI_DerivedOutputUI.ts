import { UIComponent, Binding, View, Text } from 'horizon/ui';

export class DerivedOutputUI extends UIComponent<typeof DerivedOutputUI> {
    private textBinding = new Binding("World");

    preStart() {
        this.textBinding.derive((text) => `Hello ${text}!`);
    }

    start() {}

    initializeUI() {
        return View({
            children: [
                Text({
                    text: this.textBinding,
                })
            ],
            style: {
                flex: 1
            }
        });
    }
}
UIComponent.register(DerivedOutputUI);
