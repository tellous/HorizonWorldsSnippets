import { Component, GrabbableEntity, CodeBlockEvents, Player } from 'horizon/core';

class ForceRelease extends Component<typeof ForceRelease> {
    private grabbable?: GrabbableEntity;

    preStart() {
        this.grabbable = this.entity.as(GrabbableEntity);

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

    start() {}

    private onGrab(isRightHand: boolean, player: Player) {
        // This will force release the object from the player's hand
        this.grabbable?.forceRelease();
    }

    private onRelease(player: Player) {
        console.log('Released');
    }
}

Component.register(ForceRelease);