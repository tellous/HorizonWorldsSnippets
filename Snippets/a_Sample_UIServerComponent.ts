import * as hzui from 'horizon/ui';

class UIServerComponent extends hzui.UIComponent<typeof UIServerComponent> {
    initializeUI() {
        return hzui.View({
            style: {
                flex: 1
            }
        })
    }
}
hzui.UIComponent.register(UIServerComponent);