import * as hz from 'horizon/core';

class HolsterItem extends hz.Component<typeof HolsterItem> {
    private attachable?: hz.AttachableEntity;

    start() {
        this.attachable = this.entity.as(hz.AttachableEntity);
        
        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnGrabEnd,
            this.onRelease.bind(this)
        );
    }

    private onRelease(player: hz.Player) {
        const anchor = hz.AttachablePlayerAnchor.Head;
        
        this.attachable?.attachToPlayer(player, anchor);
    }
}

hz.Component.register(HolsterItem);