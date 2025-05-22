import { Component, PropTypes, CodeBlockEvents, Player, SpawnPointGizmo } from 'horizon/core';

class TeleportPlayer extends Component<typeof TeleportPlayer> {
    static propsDefinition = {
        spawnPointGizmo: { type: PropTypes.Entity }
    };

    spawnPointGizmo?: SpawnPointGizmo;

    preStart() {
        this.spawnPointGizmo = this.props.spawnPointGizmo?.as(SpawnPointGizmo);

        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnPlayerEnterTrigger,
            this.onPlayerEnter.bind(this)
        );
    }

    start() {}

    onPlayerEnter(player: Player) {
        this.spawnPointGizmo?.teleportPlayer(player);
    }
}

Component.register(TeleportPlayer);