import * as hzui from 'horizon/ui';
import * as hz from 'horizon/core';

export class ScrollViewUI extends hzui.UIComponent<typeof ScrollViewUI> {
    initializeUI() {
        // Create a list of squares to fill the scroll view
        const squares = Array.from({ length: 20 }, (_, i) => hzui.View({
            style: {
                width: 50,
                height: 50,
                backgroundColor: hz.Color.black,
                margin: 10
            },
        }));

        return hzui.View({
            children: [
                hzui.ScrollView({
                    children: squares,
                    style: {
                        width: 300,
                        height: 300,
                        backgroundColor: hz.Color.white
                    }
                })
            ],
            style: {
                flex: 1
            }
        });
    }
}
hzui.UIComponent.register(ScrollViewUI);
