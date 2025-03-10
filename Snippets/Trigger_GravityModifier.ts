import * as hz from 'horizon/core';

class GravityModifier extends hz.Component<typeof GravityModifier> {
    start() {
        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnPlayerEnterTrigger,
            this.modifyGravity.bind(this)
        );

        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnPlayerExitTrigger,
            this.resetGravity.bind(this)
        );
    }

    private modifyGravity(player: hz.Player) {
        player.gravity.set(2);
    }

    private resetGravity(player: hz.Player) {
        player.gravity.set(9.81);
    }
}

hz.Component.register(GravityModifier);