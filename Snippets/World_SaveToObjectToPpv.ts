import { Component, CodeBlockEvents, Player } from 'horizon/core';

type MyPpvData = {
    playerName: string;
    count: number;
}

class SaveToObjectToPpv extends Component<typeof SaveToObjectToPpv> {
    //Assumes you have a PPV group in your world called "Test" with an object variable called "data" 
    private ppvName = "Test:data"

    preStart() {
        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnPlayerEnterWorld,
            this.onPlayerEnterWorld.bind(this)
        );
    }

    start() {}

    private onPlayerEnterWorld(player: Player) {
        // Get the data
        let data = this.world.persistentStorage.getPlayerVariable<MyPpvData>(
            player,
            this.ppvName
        );

        if (!data) {
            console.log("No data found, creating new data");
            data = {
                playerName: player.name.get(),
                count: 0
            };
        }

        //Add 1 to the count
        data.count++;

        // Save the data
        this.world.persistentStorage.setPlayerVariable(
            player,
            this.ppvName,
            data
        );

        console.log(`Player ${data.playerName} has count: ${data.count}`);
    }
}

Component.register(SaveToObjectToPpv);