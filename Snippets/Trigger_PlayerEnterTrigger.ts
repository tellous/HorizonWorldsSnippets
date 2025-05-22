import { Component, CodeBlockEvents, Player } from 'horizon/core';

class PlayerEnterTrigger extends Component<typeof PlayerEnterTrigger> {
    preStart() {
        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnPlayerEnterTrigger,
            this.onPlayerEnter.bind(this)
        );
    }

    start() {}

    onPlayerEnter(player: Player) {
        console.log(`${player.name.get()} entered the trigger`);
    }
}

Component.register(PlayerEnterTrigger);