import * as hz from 'horizon/core';

class AimAssist extends hz.Component<typeof AimAssist> {
    static propsDefinition = {
        target: { type: hz.PropTypes.Entity },
    };

    private target?: hz.Entity;

    start() {
        this.target = this.props.target;

        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnGrabStart,
            this.onGrab.bind(this)
        );

        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnGrabEnd,
            this.onRelease.bind(this)
        );
    }

    private onGrab(isRightHand: boolean, player: hz.Player) {
        if (!this.target) {
            console.error('Target not set in properties');
            return;
        }

        player.setAimAssistTarget(this.target);
    }

    private onRelease(player: hz.Player) {
        player.clearAimAssistTarget();
    }
}

hz.Component.register(AimAssist);
