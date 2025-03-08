import * as hz from 'horizon/core';

class PlayerFollower extends hz.Component<typeof PlayerFollower> {
    private target?: hz.Player;

    private speed: number = 0.1;

    start() {
        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnPlayerEnterWorld,
            this.onPlayerEnterWorld.bind(this)
        );

        this.connectLocalBroadcastEvent(hz.World.onUpdate, this.update.bind(this));
    }

    private onPlayerEnterWorld(player: hz.Player) {
        this.target = player;
    }

    private update(data: { deltaTime: number }) {
        if (!this.target) {
            return;
        }
        const targetPos = this.target?.position.get();
        const currentPos = this.entity.position.get();
        const direction = targetPos.sub(currentPos).normalize();
        const newPos = currentPos.add(direction.mul(this.speed));
        this.entity.position.set(newPos);
    }
}

hz.Component.register(PlayerFollower);