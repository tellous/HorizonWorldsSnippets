import * as hz from 'horizon/core';

class PlayerFinder extends hz.Component<typeof PlayerFinder> {
    start() {
        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnPlayerEnterWorld,
            this.onPlayerEnterWorld.bind(this)
        )
    }

    onPlayerEnterWorld(player: hz.Player) {
        const allPlayers = this.world.getPlayers();
        
        const playerNames = allPlayers.map(p => p.name.get());
        console.log(`Players in the world: ${playerNames.join(', ')}`);
    }
}

hz.Component.register(PlayerFinder);