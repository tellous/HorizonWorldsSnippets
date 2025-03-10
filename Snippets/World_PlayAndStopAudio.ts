import * as hz from 'horizon/core';

class PlayAndStopAudio extends hz.Component<typeof PlayAndStopAudio> {
    private audio?: hz.AudioGizmo;

    start() {
        // Get the AudioGizmo component from the entity
        this.audio = this.entity.as(hz.AudioGizmo);

        // Play the sound when the component starts
        this.audio.play();

        // Stop the sound after 3 seconds
        this.async.setTimeout(() => {
            this.audio?.stop();
        }, 3000);
    }
}

hz.Component.register(PlayAndStopAudio);