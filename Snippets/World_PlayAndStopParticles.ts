import * as hz from 'horizon/core';

class PlayAndStopParticles extends hz.Component<typeof PlayAndStopParticles> {
    private particles?: hz.ParticleGizmo;

    start() {
        // Get the AudioGizmo ParticleGizmo from the entity
        this.particles = this.entity.as(hz.ParticleGizmo);

        // Play the particle effects when the component starts
        this.particles.play();

        // Stop the particle effects after 3 seconds
        this.async.setTimeout(() => {
            this.particles?.stop();
        }, 3000);
    }
}

hz.Component.register(PlayAndStopParticles);