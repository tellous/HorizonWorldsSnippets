import { Component, Player, CodeBlockEvents } from 'horizon/core';
import { Turbo, TurboDefaultSettings, AreaEnterPayload, AreaExitPayload, TurboEvents } from 'horizon/analytics';

class SaveAreaAnalytics extends Component<typeof SaveAreaAnalytics> {
    preStart() {
        Turbo.register(this, TurboDefaultSettings);

        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnPlayerEnterTrigger,
            this.onPlayerEnterTrigger.bind(this)
        );

        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnPlayerExitTrigger,
            this.onPlayerExitTrigger.bind(this)
        );
    }

    start() {
        // Intentionally left blank
    }

    onPlayerEnterTrigger(player: Player) {
        // Save the analytics data when the player enters the trigger
        const payload: AreaEnterPayload = {
            actionArea: 'Lobby',
            actionAreaIsLobbySection: true,
            actionAreaIsPlayerReadyZone: true,
            player: player
        };
        Turbo.send(TurboEvents.OnAreaEnter, payload);
    }

    onPlayerExitTrigger(player: Player) {
        // Save the analytics data when the player exits the trigger
        const payload: AreaExitPayload = {
            actionArea: 'Lobby',
            actionAreaIsLobbySection: true,
            actionAreaIsPlayerReadyZone: true,
            player: player
        };
        Turbo.send(TurboEvents.OnAreaExit, payload);
    }
}
Component.register(SaveAreaAnalytics);