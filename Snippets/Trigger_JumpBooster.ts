import * as hz from 'horizon/core';

// Custom player movement must be enabled in world settings in the editor.
class JumpBooster extends hz.Component<typeof JumpBooster> {
    start() {
        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnPlayerEnterTrigger,
            this.boostPlayer.bind(this)
        );
    }

    private boostPlayer(player: hz.Player) {
        const jumpForce = hz.Vec3.up.mul(100);
        player.velocity.set(jumpForce);
    }
}

hz.Component.register(JumpBooster);