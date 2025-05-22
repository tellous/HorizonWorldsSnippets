import { Component, CodeBlockEvents } from 'horizon/core';

enum GameState {
    Active,
    Inactive
}

class StateManager extends Component<typeof StateManager> {
    private state = GameState.Inactive;
    
    preStart() {
        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnPlayerEnterTrigger,
            this.onPlayerEnterTrigger.bind(this)
        );
    }

    start() {
        // Intentionally left blank
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

Component.register(StateManager);