import { Component, Vec3 } from 'horizon/core';

class DistanceCheck extends Component<typeof DistanceCheck> {
    private startPosition: Vec3 = Vec3.zero;

    private endPosition: Vec3 = Vec3.zero;

    preStart() {
        // Set up the start and end positions
        this.startPosition = this.entity.position.get();
        this.endPosition = this.startPosition.add(this.entity.forward.get().mul(10));

        // Set up an interval to check the distance every second
        this.async.setInterval(() => {
            const distance = this.startPosition.distance(this.endPosition);
            console.log(distance);
        }, 1000);
    }

    start() {
        // Intentionally left blank
    }
}

Component.register(DistanceCheck);