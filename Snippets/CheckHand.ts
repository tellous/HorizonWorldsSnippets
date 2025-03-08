import * as hz from 'horizon/core';

class CheckHand extends hz.Component<typeof CheckHand> {
    start() {
        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnGrabStart,
            this.onGrab.bind(this)
        );
    }

    private onGrab(isRightHand: boolean, player:hz.Player) {
        if (isRightHand) {
            console.log('Right hand grabbed');
        } else {
            console.log('Left hand grabbed');
        }
    }
}

hz.Component.register(CheckHand);