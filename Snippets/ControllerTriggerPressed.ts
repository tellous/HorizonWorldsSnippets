import * as hz from 'horizon/core';

class ControllerTriggerPressed extends hz.Component<typeof ControllerTriggerPressed> {
    start() {
        // Set up button click handler
        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnIndexTriggerDown,
            this.handlePressed.bind(this)
        );
    }

    private handlePressed() {
        console.log('Button was clicked!');
    }
}

hz.Component.register(ControllerTriggerPressed);