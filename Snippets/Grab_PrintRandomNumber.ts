import * as hz from 'horizon/core';

class PrintRandomNumber extends hz.Component<typeof PrintRandomNumber> {
    start() {
        this.connectCodeBlockEvent(
            this.entity, 
            hz.CodeBlockEvents.OnGrabStart,
            this.onGrab.bind(this)
        );
    }

    onGrab() {
        // This will print a random number between 0 and 1 to the console
        console.log(Math.random());
    }
}

hz.Component.register(PrintRandomNumber);