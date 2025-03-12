import * as hzanalytics from 'horizon/analytics';
import * as hz from 'horizon/core';

class SaveAreaAnalytics extends hz.Component<typeof SaveAreaAnalytics> {
    start() {
        hzanalytics.Turbo.register(this, hzanalytics.TurboDefaultSettings);

        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnPlayerEnterTrigger,
            this.onPlayerEnterTrigger.bind(this)
        );

        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnPlayerExitTrigger,
            this.onPlayerExitTrigger.bind(this)
        );
    }

    onPlayerEnterTrigger(player: hz.Player) {
        // Save the analytics data when the player enters the trigger
        const payload: hzanalytics.AreaEnterPayload = {
            actionArea: 'Lobby',
            actionAreaIsLobbySection: true,
            actionAreaIsPlayerReadyZone: true,
            player: player
        };
        hzanalytics.Turbo.send(hzanalytics.TurboEvents.OnAreaEnter, payload);
    }

    onPlayerExitTrigger(player: hz.Player) {
        // Save the analytics data when the player exits the trigger
        const payload: hzanalytics.AreaExitPayload = {
            actionArea: 'Lobby',
            actionAreaIsLobbySection: true,
            actionAreaIsPlayerReadyZone: true,
            player: player
        };
        hzanalytics.Turbo.send(hzanalytics.TurboEvents.OnAreaExit, payload);
    }
}
hz.Component.register(SaveAreaAnalytics);