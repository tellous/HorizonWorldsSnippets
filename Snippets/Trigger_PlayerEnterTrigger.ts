import * as hz from 'horizon/core';

class PlayerEnterTrigger extends hz.Component<typeof PlayerEnterTrigger> {
    start() {
        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnPlayerEnterTrigger,
            this.onPlayerEnter.bind(this)
        );
    }

    onPlayerEnter(player: hz.Player) {
        console.log(`${player.name.get()} entered the trigger`);
    }
}

hz.Component.register(PlayerEnterTrigger);