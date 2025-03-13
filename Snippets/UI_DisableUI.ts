import * as hzui from 'horizon/ui';

export class DisableUI extends hzui.UIComponent<typeof DisableUI> {
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

    start() {
        // Set a timeout to disable the UI after 2 seconds
        this.async.setTimeout(() => {
            this.entity.visible.set(false);
        }, 2000);
    }
}
hzui.UIComponent.register(DisableUI);
