import * as hzui from 'horizon/ui';
import * as hz from 'horizon/core';

export class BorderUI extends hzui.UIComponent<typeof BorderUI> {
    initializeUI() {
        return hzui.View({
            children: [
                hzui.View({
                    style: {
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
hzui.UIComponent.register(BorderUI);
