import { Component, Vec3, Quaternion, CodeBlockEvents } from 'horizon/core';

class ReturnToStartingPosition extends Component<typeof ReturnToStartingPosition> {
    private startPosition: Vec3 = Vec3.zero;

    private startRotation: Quaternion = Quaternion.zero;

    preStart() {
        // Store the initial position and rotation of the entity
        this.startPosition = this.entity.position.get();
        this.startRotation = this.entity.rotation.get();
        
        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnGrabEnd,
            this.onRelease.bind(this)
        );
    }

    start() {
        // Intentionally left blank
    }

    onRelease() {
        this.entity.position.set(this.startPosition);
        this.entity.rotation.set(this.startRotation);
    }
}

Component.register(ReturnToStartingPosition);