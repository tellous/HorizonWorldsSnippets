import { Component, CodeBlockEvents, World, Player, PlayerBodyPartType, Vec3, Quaternion } from 'horizon/core';

class RelativeTransform extends Component<typeof RelativeTransform> {
    player?: Player;

    preStart() {
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

        this.connectLocalBroadcastEvent(
            World.onUpdate,
            this.onUpdate.bind(this)
        );
    }

    start() {}

    onPlayerEnterWorld(player: Player) {
        this.player = player;
    }

    onPlayerExitWorld(player: Player) {
        if (this.player === player) {
            this.player = undefined;
        }
    }

    onUpdate() {
        if (!this.player) {
            return;
        }

        this.entity.moveRelativeToPlayer(this.player, PlayerBodyPartType.RightHand, Vec3.zero);
        this.entity.rotateRelativeToPlayer(this.player, PlayerBodyPartType.RightHand, Quaternion.zero);
    }
}

Component.register(RelativeTransform);