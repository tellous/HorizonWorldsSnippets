import * as hz from 'horizon/core';

class MoveOneMeterForward extends hz.Component<typeof MoveOneMeterForward> {
    start() {
        const initialPosition = this.entity.position.get();
        const forwardDirection = this.entity.forward.get();
        const distanceToMove = 1; // Move one meter forward
        const newPosition = initialPosition.add(forwardDirection.mul(distanceToMove));
        this.entity.position.set(newPosition);

        console.log(`Moved entity from ${initialPosition} to ${newPosition}`);
    }
}

hz.Component.register(MoveOneMeterForward);