import { UIComponent, View } from 'horizon/ui';

class UIServerComponent extends UIComponent<typeof UIServerComponent> {
    initializeUI() {
        return View({
            style: {
                flex: 1
            }
        })
    }
}
UIComponent.register(UIServerComponent);