import * as hzui from 'horizon/ui';

class SampleComponent extends hzui.UIComponent<typeof SampleComponent> {
    initializeUI() {
        return hzui.View({
            style: {
                flex: 1
            }
        })
    }
}
hzui.UIComponent.register(SampleComponent);