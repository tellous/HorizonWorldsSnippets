import { UIComponent, View } from 'horizon/ui';
import { Color } from 'horizon/core';

export class ShadowUI extends UIComponent<typeof ShadowUI> {
    preStart() {}

    start() {}

    public initializeUI() {
        return View({
            children: [
                View({
                    style: {
                        width: 200,
                        height: 150,
                        backgroundColor: 'white',
                        shadowColor: Color.black,
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

UIComponent.register(ShadowUI);
