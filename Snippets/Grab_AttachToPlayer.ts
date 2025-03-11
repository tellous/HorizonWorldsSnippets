import * as hz from 'horizon/core';

class AttachToPlayer extends hz.Component<typeof AttachToPlayer> {
    private attachable?: hz.AttachableEntity;

    start() {
        this.attachable = this.entity.as(hz.AttachableEntity);
        
        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnGrabStart,
            this.onGrabStart.bind(this)
        );
    }

    private onGrabStart(isRightHand: boolean, player: hz.Player) {
        const anchor = hz.AttachablePlayerAnchor.Head;

        this.attachable?.attachToPlayer(player, anchor);
    }
}

hz.Component.register(AttachToPlayer);
