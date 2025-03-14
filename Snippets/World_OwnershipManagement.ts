import * as hz from 'horizon/core';

class OwnershipManagement extends hz.Component<typeof OwnershipManagement> {
    static propsDefinition = {
        localEntity: { type: hz.PropTypes.Entity },
    };

    private localEntity?: hz.Entity;

    private serverPlayer?: hz.Player;

    start() {
        this.serverPlayer = this.world.getServerPlayer();

        this.localEntity = this.props.localEntity?.as(hz.Entity);

        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnPlayerEnterWorld,
            this.onPlayerEnterWorld.bind(this)
        );

        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnPlayerExitWorld,
            this.onPlayerExitWorld.bind(this)
        );
    }

    private onPlayerEnterWorld(player: hz.Player) {
        // Set the player as the owner of the entity
        this.localEntity?.owner.set(player);
    }

    private onPlayerExitWorld(player: hz.Player) {
        // Reset the owner of the entity when the player exits the world
        this.localEntity?.owner.set(this.serverPlayer!);
    }
}
hz.Component.register(OwnershipManagement);