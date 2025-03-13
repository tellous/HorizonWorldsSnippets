import * as hz from 'horizon/core';

class PlaySoundAtPosition extends hz.Component<typeof PlaySoundAtPosition> {
    static propsDefinition = {
        sound: { type: hz.PropTypes.Entity }
    };

    private sound?: hz.AudioGizmo;

    start() {
        this.sound = this.props.sound?.as(hz.AudioGizmo);

        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnGrabStart,
            this.onGrab.bind(this)
        );
    }

    onGrab(isRightHand: boolean, player: hz.Player) {
        this.sound?.position.set(this.entity.position.get());
        this.sound?.play();
    }
}

hz.Component.register(PlaySoundAtPosition);