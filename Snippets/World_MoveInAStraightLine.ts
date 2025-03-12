import * as hz from 'horizon/core';

class MoveInAStraightLine extends hz.Component<typeof MoveInAStraightLine> {
    private timeElapsed: number = 0;

    private maxTime: number = 5; // Time in seconds to move
    
    private startPosition= hz.Vec3.zero;

    private endPosition = hz.Vec3.zero;

    start() {
        this.startPosition = this.entity.position.get();

        this.endPosition = this.startPosition.add(hz.Vec3.forward.mul(10)); // Move 10 meters forward

        this.connectLocalBroadcastEvent(hz.World.onUpdate, this.update.bind(this));
    }

    private update(data: { deltaTime: number }) {
        this.timeElapsed = Math.min(this.timeElapsed + data.deltaTime, this.maxTime);

        const alpha = this.timeElapsed / this.maxTime;

        // Interpolate between start and end position
        const newPosition = hz.Vec3.lerp(this.startPosition, this.endPosition, alpha);

        // Set the new position
        this.entity.position.set(newPosition);

        if (this.timeElapsed >= this.maxTime) {
            console.log('Movement completed');

            // Optionally, you can reset the timeElapsed to start over
            this.timeElapsed = 0;
        }
    }
}

hz.Component.register(MoveInAStraightLine);