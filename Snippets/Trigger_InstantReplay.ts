import { Component, CodeBlockEvents, Player } from 'horizon/core';
import { PlayerCapturing } from 'horizon/capturing';

class TriggerInstantReplay extends Component<typeof TriggerInstantReplay> {
    preStart() {
        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnPlayerEnterTrigger,
            this.onPlayerEnterTrigger.bind(this),
        );
    }

    onPlayerEnterTrigger(player: Player) {
        const capture = new PlayerCapturing(player.id);

        capture.startVideoCapture("InstantReplay").then(() => {
            console.log("Instant replay reached max time");
        }).catch((error) => {
            console.error("Something went wrong", error);
        });
    }

    start() {}
}
Component.register(TriggerInstantReplay);