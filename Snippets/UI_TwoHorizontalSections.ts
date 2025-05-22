import { UIComponent, View } from 'horizon/ui';

export class BackgroundImageUI extends UIComponent<typeof BackgroundImageUI> {
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
            ],
            style: {
                flexDirection: "row",
                flex: 1
            }
        });
    }
}
UIComponent.register(BackgroundImageUI);
