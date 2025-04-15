import * as hzui from 'horizon/ui';
import * as hz from 'horizon/core';

class UILocalComponent extends hzui.UIComponent<typeof UILocalComponent> {
    owner?: hz.Player;
    serverPlayer?: hz.Player;

    start() {
        this.owner = this.entity.owner.get();
        this.serverPlayer = this.world.getServerPlayer();
        if (this.owner === this.serverPlayer) {
            return;
        }
    }

    initializeUI() {
        return hzui.View({
            style: {
                flex: 1
            }
        })
    }
}
hzui.UIComponent.register(UILocalComponent);