import { Component, AudioGizmo } from 'horizon/core';

class PlayAndStopAudio extends Component<typeof PlayAndStopAudio> {
    private audio?: AudioGizmo;

    preStart() {
        // Get the AudioGizmo component from the entity
        this.audio = this.entity.as(AudioGizmo);

        // Play the sound when the component starts
        this.audio.play();

        // Stop the sound after 3 seconds
        this.async.setTimeout(() => {
            this.audio?.stop();
        }, 3000);
    }

    start() {
        // Intentionally left blank
    }
}

Component.register(PlayAndStopAudio);