import * as hzui from 'horizon/ui';
import * as hz from 'horizon/core';

export class ShadowUI extends hzui.UIComponent<typeof ShadowUI> {
    initializeUI() {
        return hzui.View({
            children: [
                hzui.View({
                    style: {
                        width: 200,
                        height: 150,
                        backgroundColor: 'white',
                        shadowColor: hz.Color.black,
                        shadowOffset: [10, 10],
                        shadowOpacity: 0.5,
                        shadowRadius: 5
                    }
                }),
            ],
            style: {
                flex: 1
            }
        });
    }
}
hzui.UIComponent.register(ShadowUI);
