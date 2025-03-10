import * as hzui from 'horizon/ui';

export class BackgroundImageUI extends hzui.UIComponent<typeof BackgroundImageUI> {
    initializeUI() {
        return hzui.View({
            children: [
               hzui.View({
                    style: {
                        flex: 1,
                        backgroundColor: "red",
                    }
                }),
                hzui.View({
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
hzui.UIComponent.register(BackgroundImageUI);
