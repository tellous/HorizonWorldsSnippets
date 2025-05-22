import { Component, CodeBlockEvents, World, Player, Vec3 } from 'horizon/core';

class PlayerFollower extends Component<typeof PlayerFollower> {
    private target?: Player;

    private speed: number = 0.1;

    preStart() {
        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnPlayerEnterWorld,
            this.onPlayerEnterWorld.bind(this)
        );

        this.connectLocalBroadcastEvent(World.onUpdate, this.update.bind(this));
    }

    start() {}

    private onPlayerEnterWorld(player: Player) {
        this.target = player;
    }

    private update(data: { deltaTime: number }) {
        if (!this.target) {
            return;
        }
        const targetPos = this.target.position.get();
        const currentPos = this.entity.position.get();
        const direction = targetPos.sub(currentPos).normalize();
        const newPos = currentPos.add(direction.mul(this.speed));
        this.entity.position.set(newPos);
    }
}

Component.register(PlayerFollower);