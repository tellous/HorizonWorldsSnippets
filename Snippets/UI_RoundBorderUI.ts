import { UIComponent, View } from 'horizon/ui';
import { Color } from 'horizon/core';

export class RoundBorderUI extends UIComponent<typeof RoundBorderUI> {
    preStart() {}

    start() {}

    public initializeUI() {
        return View({
            children: [
                View({
                    style: {
                        borderRadius: 20,
                        borderWidth: 2,
                        borderColor: Color.black,
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

UIComponent.register(RoundBorderUI);
