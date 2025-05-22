import { Component, GrabbableEntity, CodeBlockEvents, Player } from 'horizon/core';

class VipGrab extends Component<typeof VipGrab> {
    private vipList = [
        'Tellous'
    ]

    private grabbable?: GrabbableEntity;

    preStart() {
        this.grabbable = this.entity.as(GrabbableEntity);

        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnGrabStart,
            this.onGrab.bind(this)
        )
    }

    start() {
        // Intentionally left blank
    }
    
    onGrab(isRightHand: boolean, player: Player) {
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

Component.register(VipGrab);