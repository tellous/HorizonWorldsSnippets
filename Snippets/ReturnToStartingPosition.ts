import * as hz from 'horizon/core';

class ReturnToStartingPosition extends hz.Component<typeof ReturnToStartingPosition> {
    private startPosition: hz.Vec3 = hz.Vec3.zero;

    private startRotation: hz.Quaternion = hz.Quaternion.zero;

    start() {
        // Store the initial position and rotation of the entity
        this.startPosition = this.entity.position.get();
        this.startRotation = this.entity.rotation.get();
        
        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnGrabEnd,
            this.onRelease.bind(this)
        );
    }

    onRelease() {
        this.entity.position.set(this.startPosition);
        this.entity.rotation.set(this.startRotation);
    }
}

hz.Component.register(ReturnToStartingPosition);