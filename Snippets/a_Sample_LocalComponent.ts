import { Component, Player } from "horizon/core";

class LocalComponent extends Component<typeof LocalComponent> {
    owner?: Player;
    serverPlayer?: Player;

    preStart() {
        this.owner = this.entity.owner.get();
        this.serverPlayer = this.world.getServerPlayer();
        if (this.owner === this.serverPlayer) {
            return;
        }
    }

    start(){}
}
Component.register(LocalComponent);