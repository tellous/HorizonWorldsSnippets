import { UIComponent, View } from 'horizon/ui';
import { Color } from 'horizon/core';

class BorderUI extends UIComponent<typeof BorderUI> {
    preStart() {}

    start() {}

    public initializeUI() {
        return View({
            children: [
                View({
                    style: {
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
UIComponent.register(BorderUI);
