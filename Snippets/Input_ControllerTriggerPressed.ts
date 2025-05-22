import { Component, CodeBlockEvents } from 'horizon/core';

class ControllerTriggerPressed extends Component<typeof ControllerTriggerPressed> {
    preStart() {
        // Set up button click handler
        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnIndexTriggerDown,
            this.handlePressed.bind(this)
        );
    }

    start() {}

    private handlePressed() {
        console.log('Button was clicked!');
    }
}

Component.register(ControllerTriggerPressed);