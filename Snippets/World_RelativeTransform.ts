import * as hz from 'horizon/core';

class RelativeTransform extends hz.Component<typeof RelativeTransform> {
    player?: hz.Player;

    start() {
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

        this.connectLocalBroadcastEvent(
            hz.World.onUpdate,
            this.onUpdate.bind(this)
        );
    }

    onPlayerEnterWorld(player: hz.Player) {
        this.player = player;
    }

    onPlayerExitWorld(player: hz.Player) {
        if (this.player === player) {
            this.player = undefined;
        }
    }

    onUpdate() {
        if (!this.player) {
            return;
        }

        this.entity.moveRelativeToPlayer(this.player, hz.PlayerBodyPartType.RightHand, hz.Vec3.zero);
        this.entity.rotateRelativeToPlayer(this.player, hz.PlayerBodyPartType.RightHand, hz.Quaternion.zero);
    }
}

hz.Component.register(RelativeTransform);