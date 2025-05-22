import { Component, ParticleGizmo } from 'horizon/core';

class PlayAndStopParticles extends Component<typeof PlayAndStopParticles> {
    private particles?: ParticleGizmo;

    preStart() {
        // Get the AudioGizmo ParticleGizmo from the entity
        this.particles = this.entity.as(ParticleGizmo);

        // Play the particle effects when the component starts
        this.particles.play();

        // Stop the particle effects after 3 seconds
        this.async.setTimeout(() => {
            this.particles?.stop();
        }, 3000);
    }

    start() {
        // Intentionally left blank
    }
}

Component.register(PlayAndStopParticles);