import { Component, CodeBlockEvents, Vec3, Player } from 'horizon/core';

// Custom player movement must be enabled in world settings in the editor.
class JumpBooster extends Component<typeof JumpBooster> {
    preStart() {
        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnPlayerEnterTrigger,
            this.boostPlayer.bind(this)
        );
    }

    start() {}

    private boostPlayer(player: Player) {
        const jumpForce = Vec3.up.mul(100);
        player.velocity.set(jumpForce);
    }
}

Component.register(JumpBooster);