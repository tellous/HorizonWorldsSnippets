import { UIComponent, View, Text } from 'horizon/ui';

class DisableUI extends UIComponent<typeof DisableUI> {
    initializeUI() {
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

    preStart() {
        // Set a timeout to disable the UI after 2 seconds
        this.async.setTimeout(() => {
            this.entity.visible.set(false);
        }, 2000);
    }

    start() {}
}
UIComponent.register(DisableUI);
