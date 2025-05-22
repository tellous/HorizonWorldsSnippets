import * as hz from 'horizon/core';

class PlayParticles extends hz.Component<typeof PlayParticles> {
    static propsDefinition = {
        particle: { type: hz.PropTypes.Entity }
    };

    particle?: hz.ParticleGizmo;

    start() {
        this.particle = this.props.particle?.as(hz.ParticleGizmo);

        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnPlayerEnterTrigger,
            this.onPlayerEnterTrigger.bind(this),
        );
    }

    onPlayerEnterTrigger(player: hz.Player) {
        this.particle?.play();
    }
}
hz.Component.register(PlayParticles);