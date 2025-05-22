import { Component, AttachableEntity, Player, CodeBlockEvents, AttachablePlayerAnchor } from 'horizon/core';

class HolsterItem extends Component<typeof HolsterItem> {
    private attachable?: AttachableEntity;

    preStart() {
        this.attachable = this.entity.as(AttachableEntity);
        
        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnGrabEnd,
            this.onRelease.bind(this)
        );
    }

    private onRelease(player: Player) {
        const anchor = AttachablePlayerAnchor.Head;
        
        this.attachable?.attachToPlayer(player, anchor);
    }

    start() {}
}

Component.register(HolsterItem);