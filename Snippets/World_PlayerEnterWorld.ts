import { Component, CodeBlockEvents, Player } from 'horizon/core';

class PlayerEnterWorld extends Component<typeof PlayerEnterWorld> {
    preStart() {
        // Listen for players entering the world
        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnPlayerEnterWorld,
            this.onPlayerEnter.bind(this)
        );

        // Listen for players leaving the world
        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnPlayerExitWorld,
            this.onPlayerExit.bind(this)
        );
    }

    start() {}

    onPlayerEnter(player: Player) {
        console.log(`${player.name.get()} has entered the world.`);
    }
    
    onPlayerExit(player: Player) {
        console.log(`${player.name.get()} has left the world.`);
    }
}

Component.register(PlayerEnterWorld);