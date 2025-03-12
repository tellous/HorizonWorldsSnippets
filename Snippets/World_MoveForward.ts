import * as hz from 'horizon/core';

class MoveForward extends hz.Component<typeof MoveForward> {
    private speed: number = 1; // Increase this value to move faster

    start() {
        this.connectLocalBroadcastEvent(hz.World.onUpdate, this.update.bind(this));
    }

    private update(data: { deltaTime: number }) {
        const currentPosition = this.entity.position.get();
        const forward = this.entity.forward.get();
        const newPosition = currentPosition.add(forward.mul(this.speed * data.deltaTime));
        this.entity.position.set(newPosition);
    }
}

hz.Component.register(MoveForward);