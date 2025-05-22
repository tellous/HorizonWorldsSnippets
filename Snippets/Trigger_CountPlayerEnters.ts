import { Component, CodeBlockEvents } from 'horizon/core';

class NetworkSync extends Component<typeof NetworkSync> {
    private counter = 0;
    
    preStart() {
        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnPlayerEnterTrigger,
            this.onPlayerEnterTrigger.bind(this)
        );
    }

    start() {
        // Intentionally left blank
    }
    
    onPlayerEnterTrigger() {
        this.counter++;
        console.log(`Counter is now: ${this.counter}`);
    }
}

Component.register(NetworkSync);