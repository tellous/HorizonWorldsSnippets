import * as hz from 'horizon/core';

class ForceRelease extends hz.Component<typeof ForceRelease> {
    private grabbable?: hz.GrabbableEntity;

    start() {
        this.grabbable = this.entity.as(hz.GrabbableEntity);

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

    private onGrab(isRightHand: boolean, player:hz.Player) {
        // This will force release the object from the player's hand
        this.grabbable?.forceRelease()
    }

    private onRelease(player:hz.Player) {
        console.log('Released');
    }
}

hz.Component.register(ForceRelease);