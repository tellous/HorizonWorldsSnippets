import { Component, CodeBlockEvents } from 'horizon/core';

class ToggleVisibility extends Component<typeof ToggleVisibility> {
    preStart() {
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

    start() {
        // Intentionally left blank
    }

    onGrab() {
        this.entity.visible.set(false);
    }

    onRelease() {
        this.entity.visible.set(true);
    }
}

Component.register(ToggleVisibility);