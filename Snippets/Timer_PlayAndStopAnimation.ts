import { Component, AnimatedEntity } from 'horizon/core';

class PlayAndStopAnimation extends Component<typeof PlayAndStopAnimation> {
    private animatedEntity?: AnimatedEntity; 

    preStart() {
        // Get the AnimatedEntity component from the entity
        this.animatedEntity = this.entity.as(AnimatedEntity);

        // Play the animation when the component starts
        this.animatedEntity.play();

        // Stop the animation after 3 seconds
        this.async.setTimeout(() => {
            this.animatedEntity?.stop();
        }, 3000);
    }

    start() {
        // Intentionally left blank
    }
}

Component.register(PlayAndStopAnimation);