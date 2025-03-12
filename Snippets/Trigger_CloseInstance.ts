import * as hz from 'horizon/core';

class CloseInstance extends hz.Component<typeof CloseInstance> {
    start() {
        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnPlayerEnterTrigger,
            this.OnPlayerEnterTrigger.bind(this)
        );
    }

    private OnPlayerEnterTrigger() {
        // This will lock the instance and not allow any new players to join
        this.world.matchmaking.allowPlayerJoin(false);
    }
}

hz.Component.register(CloseInstance);