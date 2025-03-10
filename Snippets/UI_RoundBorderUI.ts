import * as hzui from 'horizon/ui';
import * as hz from 'horizon/core';

export class RoundBorderUI extends hzui.UIComponent<typeof RoundBorderUI> {
    initializeUI() {
        return hzui.View({
            children: [
                hzui.View({
                    style: {
                        borderRadius: 20,
                        borderWidth: 2,
                        borderColor: hz.Color.black,
                        width: 100,
                        height: 100
                    }
                }),
            ],
            style: {
                flex: 1
            }
        });
    }
}
hzui.UIComponent.register(RoundBorderUI);
