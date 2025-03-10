import * as hz from 'horizon/core';

class DistanceCheck extends hz.Component<typeof DistanceCheck> {
    private startPosition: hz.Vec3 = hz.Vec3.zero;

    private endPosition: hz.Vec3 = hz.Vec3.zero;

    start() {
        // Set up the start and end positions
        this.startPosition = this.entity.position.get();
        this.endPosition = this.startPosition.add(this.entity.forward.get().mul(10));

        // Set up an interval to check the distance every second
        this.async.setInterval(() => {
            const distance = this.startPosition.distance(this.endPosition);
            console.log(distance);
        }, 1000);
    }
}

hz.Component.register(DistanceCheck);