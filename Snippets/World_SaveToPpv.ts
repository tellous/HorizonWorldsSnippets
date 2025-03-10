import * as hz from 'horizon/core';

class SaveToPpv extends hz.Component<typeof SaveToPpv> {
    //Assumes you have a PPV group in your world called "Test" with a number variable called "count" 
    private ppvName = "Test:count"

    start() {
        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnPlayerEnterWorld,
            this.onPlayerEnterWorld.bind(this)
        );
    }

    private onPlayerEnterWorld(player: hz.Player) {
        // Get the count
        let count = this.world.persistentStorage.getPlayerVariable(
            player,
            this.ppvName
        );

        //Add 1 to the count
        count++;

        // Save the count
        this.world.persistentStorage.setPlayerVariable(
            player,
            this.ppvName,
            count
        );

        console.log(`Player ${player.name.get()} has count: ${count}`);
    }
}

hz.Component.register(SaveToPpv);