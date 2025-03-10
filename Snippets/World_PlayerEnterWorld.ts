import * as hz from 'horizon/core';

class PlayerEnterWorld extends hz.Component<typeof PlayerEnterWorld> {
    start() {
        // Listen for players entering the world
        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnPlayerEnterWorld,
            this.onPlayerEnter.bind(this)
        );

        // Listen for players leaving the world
        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnPlayerExitWorld,
            this.onPlayerExit.bind(this)
        );
    }

    onPlayerEnter(player: hz.Player) {
        console.log(`${player.name.get()} has entered the world.`);
    }
    
    onPlayerExit(player: hz.Player) {
        console.log(`${player.name.get()} has left the world.`);
    }
}

hz.Component.register(PlayerEnterWorld);