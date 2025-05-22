import { Component } from 'horizon/core';

class MoveForwardOneMeter extends Component<typeof MoveForwardOneMeter> {
    preStart() {
        const initialPosition = this.entity.position.get();
        const forwardDirection = this.entity.forward.get();
        const distanceToMove = 1; // Move one meter forward
        const newPosition = initialPosition.add(forwardDirection.mul(distanceToMove));
        this.entity.position.set(newPosition);
        console.log(`Moved entity from ${initialPosition} to ${newPosition}`);
    }

    start() {}
}

Component.register(MoveForwardOneMeter);