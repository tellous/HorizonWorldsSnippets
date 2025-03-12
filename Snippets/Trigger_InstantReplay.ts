import * as hz from 'horizon/core';
import hzcapture from 'horizon/capturing';

class TriggerInstantReplay extends hz.Component<typeof TriggerInstantReplay> {
    start() {
        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnPlayerEnterTrigger,
            this.onPlayerEnterTrigger.bind(this),
        );
    }

    onPlayerEnterTrigger(player: hz.Player) {
        const capture = new hzcapture.PlayerCapturing(player.id);

        capture.startVideoCapture("InstantReplay").then(() => {
            console.log("Instant replay reached max time");
        }).catch((error) => {
            console.error("Something went wrong", error);
        });
    }
}
hz.Component.register(TriggerInstantReplay);