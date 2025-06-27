import { UIComponent, Binding, View, Text } from 'horizon/ui';

class DerivedOutputUI extends UIComponent<typeof DerivedOutputUI> {
    private textBinding = new Binding("World");

    preStart() {
    }

    start() {}

    initializeUI() {
        return View({
            children: [
                Text({
                    text: this.textBinding.derive((text) => `Hello ${text}!`),
                })
            ],
            style: {
                flex: 1
            }
        });
    }
}
UIComponent.register(DerivedOutputUI);
