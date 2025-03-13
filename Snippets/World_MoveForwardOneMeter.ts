import * as hz from 'horizon/core';

class MoveForwardOneMeter extends hz.Component<typeof MoveForwardOneMeter> {
    start() {
        const initialPosition = this.entity.position.get();
        const forwardDirection = this.entity.forward.get();
        const distanceToMove = 1; // Move one meter forward
        const newPosition = initialPosition.add(forwardDirection.mul(distanceToMove));
        this.entity.position.set(newPosition);

        console.log(`Moved entity from ${initialPosition} to ${newPosition}`);
    }
}

hz.Component.register(MoveForwardOneMeter);