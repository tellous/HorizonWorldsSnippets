import { Component, Entity, Player, PropTypes, CodeBlockEvents } from 'horizon/core';

class AimAssist extends Component<typeof AimAssist> {
    static propsDefinition = {
        target: { type: PropTypes.Entity },
    };

    private target?: Entity;

    start() {}

    preStart() {
        this.target = this.props.target;

        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnGrabStart,
            this.onGrab.bind(this)
        );

        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnGrabEnd,
            this.onRelease.bind(this)
        );
    }

    private onGrab(isRightHand: boolean, player: Player) {
        if (!this.target) {
            console.error('Target not set in properties');
            return;
        }

        player.setAimAssistTarget(this.target);
    }

    private onRelease(player: Player) {
        player.clearAimAssistTarget();
    }
}

Component.register(AimAssist);
