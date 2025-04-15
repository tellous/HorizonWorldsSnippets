import * as hz from 'horizon/core';

class LocalComponent extends hz.Component<typeof LocalComponent> {
    owner?: hz.Player;
    serverPlayer?: hz.Player;

    start() {
        this.owner = this.entity.owner.get();
        this.serverPlayer = this.world.getServerPlayer();
        if (this.owner === this.serverPlayer) {
            return;
        }
    }
}
hz.Component.register(LocalComponent);