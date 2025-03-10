import * as hz from 'horizon/core';

class ToggleVisibility extends hz.Component<typeof ToggleVisibility> {
    start() {
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
        this.entity.visible.set(false);
    }

    onRelease() {
        this.entity.visible.set(true);
    }
}

hz.Component.register(ToggleVisibility);