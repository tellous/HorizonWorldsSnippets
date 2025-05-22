import { Component, CodeBlockEvents, Player } from 'horizon/core';

class PlayerFinder extends Component<typeof PlayerFinder> {
    preStart() {
        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnPlayerEnterWorld,
            this.onPlayerEnterWorld.bind(this)
        );
    }

    start() {}

    onPlayerEnterWorld(player: Player) {
        const allPlayers = this.world.getPlayers();
        const playerNames = allPlayers.map(p => p.name.get());
        console.log(`Players in the world: ${playerNames.join(', ')}`);
    }
}

Component.register(PlayerFinder);