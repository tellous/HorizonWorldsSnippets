import * as hz from 'horizon/core';

class FocusedInteraction extends hz.Component<typeof FocusedInteraction> {
    start() {
        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnPlayerEnterTrigger,
            this.onPlayerEnterTrigger.bind(this)
        );
    }
    
    private onPlayerEnterTrigger(player: hz.Player) {
        player.enterFocusedInteractionMode();
    }
}

hz.Component.register(FocusedInteraction);