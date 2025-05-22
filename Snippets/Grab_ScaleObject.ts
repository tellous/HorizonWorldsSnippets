import { Component, Vec3, CodeBlockEvents } from 'horizon/core';

class ScaleObject extends Component<typeof ScaleObject> {
    private startScale = Vec3.zero;

    private doubleScale = Vec3.zero;

    preStart() {
        this.startScale = this.entity.scale.get();

        this.doubleScale = this.startScale.mul(2);

        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnGrabStart,
            this.onGrab.bind(this)
        );

        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnGrabEnd,
            this.onRelease.bind(this)
        );
    }

    start() {}

    onGrab() {
        this.entity.scale.set(this.doubleScale);
    }

    onRelease() {
        this.entity.scale.set(this.startScale);
    }
}

Component.register(ScaleObject);