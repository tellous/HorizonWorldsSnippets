import { UIComponent, View } from 'horizon/ui';

class BackgroundImageUI extends UIComponent<typeof BackgroundImageUI> {
    preStart() {}
    start() {}
    public initializeUI() {
        return View({
            children: [
                View({
                    style: {
                        flex: 1,
                        backgroundColor: "red",
                    }
                }),
                View({
                    style: {
                        flex: 1,
                        backgroundColor: "green",
                    }
                }),
                View({
                    style: {
                        flex: 1,
                        backgroundColor: "blue",
                    }
                }),
            ],
            style: {
                flex: 1
            }
        });
    }
}
UIComponent.register(BackgroundImageUI);
