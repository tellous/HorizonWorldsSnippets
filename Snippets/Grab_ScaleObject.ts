import * as hz from 'horizon/core';

class ScaleObject extends hz.Component<typeof ScaleObject> {
    private startScale = hz.Vec3.zero;

    private doubleScale = hz.Vec3.zero;

    start() {
        this.startScale = this.entity.scale.get();

        this.doubleScale = this.startScale.mul(2);

        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnGrabStart,
            this.onGrab.bind(this)
        );

        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnGrabEnd,
            this.onRelease.bind(this)
        );
    }

    onGrab() {
        this.entity.scale.set(this.doubleScale);
    }

    onRelease() {
        this.entity.scale.set(this.startScale);
    }
}

hz.Component.register(ScaleObject);