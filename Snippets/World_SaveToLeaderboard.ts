import { Component, CodeBlockEvents, Player } from 'horizon/core';

class SaveToLeaderboard extends Component<typeof SaveToLeaderboard> {
    //Assumes you have a PPV group in your world called "Test" with a number variable called "score" 
    private ppvName = "Test:score"

    //Assumes you have a leaderboard called "TotalScore"
    private leaderboardName = "TotalScore"

    preStart() {
        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnPlayerEnterWorld,
            this.onPlayerEnterWorld.bind(this)
        );
    }

    start() {}

    private onPlayerEnterWorld(player: Player) {
        // Get the player's score
        let score = this.world.persistentStorage.getPlayerVariable(
            player,
            this.ppvName
        );

        //Add 1 to the score
        score++;

        // Save the player's score
        this.world.persistentStorage.setPlayerVariable(
            player,
            this.ppvName,
            score
        );

        //Save to leaderboard
        this.world.leaderboards.setScoreForPlayer(
            this.leaderboardName,
            player,
            score,
            false
        );
    }
}

Component.register(SaveToLeaderboard);