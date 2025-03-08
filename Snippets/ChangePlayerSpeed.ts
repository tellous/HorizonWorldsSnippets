import * as hz from 'horizon/core';

class ChangePlayerSpeed extends hz.Component<typeof ChangePlayerSpeed> {
    start() {
        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnPlayerEnterTrigger,
            this.onPlayerEnterTrigger.bind(this)
        );
    }

    private onPlayerEnterTrigger(player: hz.Player) {
        // Change the player's speed
        player.locomotionSpeed.set(10);
    }
}

hz.Component.register(ChangePlayerSpeed);