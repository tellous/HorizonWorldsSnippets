import { Component, PropTypes, CodeBlockEvents, ParticleGizmo, Player } from 'horizon/core';

class PlayParticles extends Component<typeof PlayParticles> {
    static propsDefinition = {
        particle: { type: PropTypes.Entity }
    };

    particle?: ParticleGizmo;

    preStart() {
        this.particle = this.props.particle?.as(ParticleGizmo);

        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnPlayerEnterTrigger,
            this.onPlayerEnterTrigger.bind(this),
        );
    }

    start() {
        // Intentionally left blank
    }

    onPlayerEnterTrigger(player: Player) {
        this.particle?.play();
    }
}
Component.register(PlayParticles);