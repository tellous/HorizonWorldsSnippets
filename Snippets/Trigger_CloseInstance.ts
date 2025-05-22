import { Component, CodeBlockEvents } from 'horizon/core';

class CloseInstance extends Component<typeof CloseInstance> {
    preStart() {
        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnPlayerEnterTrigger,
            this.OnPlayerEnterTrigger.bind(this)
        );
    }

    private OnPlayerEnterTrigger() {
        // This will lock the instance and not allow any new players to join
        this.world.matchmaking.allowPlayerJoin(false);
    }

    start() {}
}

Component.register(CloseInstance);