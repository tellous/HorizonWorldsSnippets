import { Component, CodeBlockEvents, Player } from 'horizon/core';

class GravityModifier extends Component<typeof GravityModifier> {
    preStart() {
        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnPlayerEnterTrigger,
            this.modifyGravity.bind(this)
        );

        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnPlayerExitTrigger,
            this.resetGravity.bind(this)
        );
    }

    start() {}

    private modifyGravity(player: Player) {
        player.gravity.set(2);
    }

    private resetGravity(player: Player) {
        player.gravity.set(9.81);
    }
}

Component.register(GravityModifier);