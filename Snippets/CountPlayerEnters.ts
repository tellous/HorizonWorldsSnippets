import * as hz from 'horizon/core';

class NetworkSync extends hz.Component<typeof NetworkSync> {
    private counter = 0;
    
    start() {
        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnPlayerEnterTrigger,
            this.onPlayerEnterTrigger.bind(this)
        );
    }
    
    onPlayerEnterTrigger() {
        this.counter++;
        console.log(`Counter is now: ${this.counter}`);
    }
}

hz.Component.register(NetworkSync);