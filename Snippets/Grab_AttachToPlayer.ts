import { Component, AttachableEntity, Player, AttachablePlayerAnchor, CodeBlockEvents } from 'horizon/core';

class AttachToPlayer extends Component<typeof AttachToPlayer> {
    private attachable?: AttachableEntity;

    preStart() {
        this.attachable = this.entity.as(AttachableEntity);
        
        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnGrabStart,
            this.onGrabStart.bind(this)
        );
    }

    private onGrabStart(isRightHand: boolean, player: Player) {
        const anchor = AttachablePlayerAnchor.Head;

        this.attachable?.attachToPlayer(player, anchor);
    }

    start() {}
}

Component.register(AttachToPlayer);
