import { Component, World } from 'horizon/core';

class MoveForward extends Component<typeof MoveForward> {
    private speed: number = 1; // Increase this value to move faster

    preStart() {
        this.connectLocalBroadcastEvent(World.onUpdate, this.update.bind(this));
    }

    start() {}

    private update(data: { deltaTime: number }) {
        const currentPosition = this.entity.position.get();
        const forward = this.entity.forward.get();
        const newPosition = currentPosition.add(forward.mul(this.speed * data.deltaTime));
        this.entity.position.set(newPosition);
    }
}

Component.register(MoveForward);