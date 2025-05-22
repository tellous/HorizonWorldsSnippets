import { Component, PropTypes, CodeBlockEvents, AudioGizmo, Player } from 'horizon/core';

class PlaySoundAtPosition extends Component<typeof PlaySoundAtPosition> {
    static propsDefinition = {
        sound: { type: PropTypes.Entity }
    };

    private sound?: AudioGizmo;

    preStart() {
        this.sound = this.props.sound?.as(AudioGizmo);

        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnGrabStart,
            this.onGrab.bind(this)
        );
    }

    start() {}

    onGrab(isRightHand: boolean, player: Player) {
        this.sound?.position.set(this.entity.position.get());
        this.sound?.play();
    }
}

Component.register(PlaySoundAtPosition);