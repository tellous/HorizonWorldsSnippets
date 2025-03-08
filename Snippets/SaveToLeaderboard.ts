import * as hz from 'horizon/core';

class SaveToLeaderboard extends hz.Component<typeof SaveToLeaderboard> {
    //Assumes you have a PPV group in your world called "Test" with a number variable called "score" 
    private ppvName = "Test:score"

    //Assumes you have a leaderboard called "TotalScore"
    private leaderboardName = "TotalScore"

    start() {
        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnPlayerEnterWorld,
            this.onPlayerEnterWorld.bind(this)
        );
    }

    private onPlayerEnterWorld(player: hz.Player) {
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

hz.Component.register(SaveToLeaderboard);