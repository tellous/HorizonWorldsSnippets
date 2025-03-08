import * as hz from 'horizon/core';

class TeleportPlayer extends hz.Component<typeof TeleportPlayer> {
    static propsDefinition = {
        spawnPointGizmo: { type: hz.PropTypes.Entity }
    };

    spawnPointGizmo?: hz.SpawnPointGizmo;

    start() {
        this.spawnPointGizmo = this.props.spawnPointGizmo?.as(hz.SpawnPointGizmo);

        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnPlayerEnterTrigger,
            this.onPlayerEnter.bind(this)
        );
    }

    onPlayerEnter(player: hz.Player) {
        this.spawnPointGizmo?.teleportPlayer(player);
    }
}

hz.Component.register(TeleportPlayer);