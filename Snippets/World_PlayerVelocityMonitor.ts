import * as hz from 'horizon/core';

class PlayerVelocityMonitor extends hz.Component<typeof PlayerVelocityMonitor> {
    private player?: hz.Player;

    private speedThreshold: number = 5; // Speed threshold in m/s

    start() {
        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnPlayerEnterWorld,
            this.onPlayerEnterWorld.bind(this)
        );

        this.connectLocalBroadcastEvent(
            hz.World.onUpdate,
            this.onUpdate.bind(this)
        );
    }

    private onPlayerEnterWorld(player: hz.Player) {
        this.player = player;
    }

    onUpdate() {
        if (!this.player) {
            return;
        }
        const velocity = this.player.velocity.get();
        const speed = velocity.magnitude();

        if (speed > this.speedThreshold) {
            console.log(`Moving fast: ${speed.toFixed(2)} m/s`);
        }
    }
}

hz.Component.register(PlayerVelocityMonitor);