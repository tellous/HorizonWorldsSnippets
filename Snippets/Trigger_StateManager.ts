import * as hz from 'horizon/core';

enum GameState {
    Active,
    Inactive
}

class StateManager extends hz.Component<typeof StateManager> {
    private state = GameState.Inactive;
    
    start() {
        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnPlayerEnterTrigger,
            this.onPlayerEnterTrigger.bind(this)
        );
    }
    
    onPlayerEnterTrigger() {
        if (this.state === GameState.Inactive) {
            this.state = GameState.Active;
            console.log('Game state changed to Active');
        } else {
            this.state = GameState.Inactive;
            console.log('Game state changed to Inactive');
        }
    }
}

hz.Component.register(StateManager);