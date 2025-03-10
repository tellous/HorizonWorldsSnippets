import * as hz from 'horizon/core';

class PlayAndStopAnimation extends hz.Component<typeof PlayAndStopAnimation> {
    private animatedEntity?: hz.AnimatedEntity; 

    start() {
        // Get the AnimatedEntity component from the entity
        this.animatedEntity = this.entity.as(hz.AnimatedEntity);

        // Play the animation when the component starts
        this.animatedEntity.play();

        // Stop the animation after 3 seconds
        this.async.setTimeout(() => {
            this.animatedEntity?.stop();
        }, 3000);
    }
}

hz.Component.register(PlayAndStopAnimation);