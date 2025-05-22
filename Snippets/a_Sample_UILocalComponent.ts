import { UIComponent, View } from 'horizon/ui';
import { Player } from 'horizon/core';

class UILocalComponent extends UIComponent<typeof UILocalComponent> {
    owner?: Player;
    serverPlayer?: Player;

    preStart() {
        this.owner = this.entity.owner.get();
        this.serverPlayer = this.world.getServerPlayer();
        if (this.owner === this.serverPlayer) {
            return;
        }
    }

    start() {}

    initializeUI() {
        return View({
            style: {
                flex: 1
            }
        })
    }
}
UIComponent.register(UILocalComponent);