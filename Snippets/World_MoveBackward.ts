import { Component, World } from 'horizon/core';

class MoveBackward extends Component<typeof MoveBackward> {
    private speed: number = 1; // Increase this value to move faster

    preStart() {
        this.connectLocalBroadcastEvent(World.onUpdate, this.update.bind(this));
    }

    start() {}

    private update(data: { deltaTime: number }) {
        const currentPosition = this.entity.position.get();
        const backward = this.entity.forward.get().mul(-1); // Invert the forward direction to move backward
        const newPosition = currentPosition.add(backward.mul(this.speed * data.deltaTime));
        this.entity.position.set(newPosition);
    }
}

Component.register(MoveBackward);