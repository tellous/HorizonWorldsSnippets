import { Component, CodeBlockEvents, Player } from 'horizon/core';

class ChangePlayerSpeed extends Component<typeof ChangePlayerSpeed> {
    preStart() {
        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnPlayerEnterTrigger,
            this.onPlayerEnterTrigger.bind(this)
        );
    }

    start() {}

    private onPlayerEnterTrigger(player: Player) {
        // Change the player's speed
        player.locomotionSpeed.set(10);
    }
}

Component.register(ChangePlayerSpeed);