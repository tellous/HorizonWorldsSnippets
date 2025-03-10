import * as hz from 'horizon/core';

class VipGrab extends hz.Component<typeof VipGrab> {
    private vipList = [
        'Tellous'
    ]

    private grabbable?: hz.GrabbableEntity;

    start() {
        this.grabbable = this.entity.as(hz.GrabbableEntity);

        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnGrabStart,
            this.onGrab.bind(this)
        )
    }
    
    onGrab(isRightHand: boolean, player:hz.Player) {
        // Check if the player is in the VIP list
        if (this.vipList.includes(player.name.get())) {
            // Allow the player to grab the object
            console.log('VIP Grab: Allowed');
        } else {
            // Prevent the player from grabbing the object
            console.log('VIP Grab: Not allowed');
            this.grabbable?.forceRelease();
        }
    }
}

hz.Component.register(VipGrab);