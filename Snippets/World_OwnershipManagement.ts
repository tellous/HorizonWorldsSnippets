import { Component, PropTypes, Entity, Player, CodeBlockEvents } from 'horizon/core';

class OwnershipManagement extends Component<typeof OwnershipManagement> {
    static propsDefinition = {
        localEntity: { type: PropTypes.Entity },
    };

    private localEntity?: Entity;
    private serverPlayer?: Player;

    preStart() {
        this.serverPlayer = this.world.getServerPlayer();
        this.localEntity = this.props.localEntity?.as(Entity);
        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnPlayerEnterWorld,
            this.onPlayerEnterWorld.bind(this)
        );
        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnPlayerExitWorld,
            this.onPlayerExitWorld.bind(this)
        );
    }

    start() {}

    private onPlayerEnterWorld(player: Player) {
        this.localEntity?.owner.set(player);
    }

    private onPlayerExitWorld(player: Player) {
        this.localEntity?.owner.set(this.serverPlayer!);
    }
}
Component.register(OwnershipManagement);