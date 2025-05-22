import { Component, CodeBlockEvents, Player } from 'horizon/core';

class SaveToPpv extends Component<typeof SaveToPpv> {
    //Assumes you have a PPV group in your world called "Test" with a number variable called "count" 
    private ppvName = "Test:count"

    preStart() {
        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnPlayerEnterWorld,
            this.onPlayerEnterWorld.bind(this)
        );
    }

    start() {}

    private onPlayerEnterWorld(player: Player) {
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

Component.register(SaveToPpv);