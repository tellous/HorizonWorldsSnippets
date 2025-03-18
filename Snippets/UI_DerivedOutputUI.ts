import * as hzui from 'horizon/ui';

export class DerivedOutputUI extends hzui.UIComponent<typeof DerivedOutputUI> {
    private textBinding = new hzui.Binding("World");

    initializeUI() {
        return hzui.View({
            children: [
                hzui.Text({
                    text: this.textBinding.derive((text) => `Hello ${text}!`),
                })
            ],
            style: {
                flex: 1
            }
        });
    }
}
hzui.UIComponent.register(DerivedOutputUI);
