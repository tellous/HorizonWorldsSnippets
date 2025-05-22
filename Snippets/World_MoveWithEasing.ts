import { Component, World, Vec3 } from 'horizon/core';

class MoveInAStraightLine extends Component<typeof MoveInAStraightLine> {
    private timeElapsed: number = 0;
    private maxTime: number = 5; // Time in seconds to move
    private startPosition = Vec3.zero;
    private endPosition = Vec3.zero;

    preStart() {
        this.startPosition = this.entity.position.get();
        this.endPosition = this.startPosition.add(Vec3.forward.mul(10)); // Move 10 meters forward
        this.connectLocalBroadcastEvent(World.onUpdate, this.update.bind(this));
    }

    start() {}

    private update(data: { deltaTime: number }) {
        this.timeElapsed = Math.min(this.timeElapsed + data.deltaTime, this.maxTime);
        const alpha = this.timeElapsed / this.maxTime;
        //Ease out
        const easeOutAlpha = 1 - Math.pow(1 - alpha, 3);
        // Interpolate between start and end position
        const newPosition = Vec3.lerp(this.startPosition, this.endPosition, easeOutAlpha);
        // Set the new position
        this.entity.position.set(newPosition);
        if (this.timeElapsed >= this.maxTime) {
            console.log('Movement completed');
            // Optionally, you can reset the timeElapsed to start over
            this.timeElapsed = 0;
        }
    }
}

Component.register(MoveInAStraightLine);