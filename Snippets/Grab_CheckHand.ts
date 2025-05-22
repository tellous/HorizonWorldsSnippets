import { Component, CodeBlockEvents, Entity, Player } from 'horizon/core';

class CheckHand extends Component<typeof CheckHand> {
    preStart() {
        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnGrabStart,
            this.onGrab.bind(this)
        );
    }

    start() {}

    private onGrab(isRightHand: boolean, player: Player) {
        if (isRightHand) {
            console.log('Right hand grabbed');
        } else {
            console.log('Left hand grabbed');
        }
    }
}

Component.register(CheckHand);