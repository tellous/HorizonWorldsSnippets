import { Component, CodeBlockEvents } from 'horizon/core';

class PrintRandomNumber extends Component<typeof PrintRandomNumber> {
    preStart() {
        this.connectCodeBlockEvent(
            this.entity, 
            CodeBlockEvents.OnGrabStart,
            this.onGrab.bind(this)
        );
    }

    start() {
        // Intentionally left blank
    }

    onGrab() {
        // This will print a random number between 0 and 1 to the console
        console.log(Math.random());
    }
}

Component.register(PrintRandomNumber);