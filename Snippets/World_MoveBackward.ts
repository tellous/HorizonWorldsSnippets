import * as hz from 'horizon/core';

class MoveBackward extends hz.Component<typeof MoveBackward> {
    private speed: number = 1; // Increase this value to move faster

    start() {
        this.connectLocalBroadcastEvent(hz.World.onUpdate, this.update.bind(this));
    }

    private update(data: { deltaTime: number }) {
        const currentPosition = this.entity.position.get();
        const backward = this.entity.forward.get().mul(-1); // Invert the forward direction to move backward
        const newPosition = currentPosition.add(backward.mul(this.speed * data.deltaTime));
        this.entity.position.set(newPosition);
    }
}

hz.Component.register(MoveBackward);