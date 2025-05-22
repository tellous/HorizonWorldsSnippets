import { Component, Entity, Player, CodeBlockEvents, PropTypes } from 'horizon/core';

// This script must be set to "Local" execution mode in the editor.
class LocalOwnershipDelegation extends Component<typeof LocalOwnershipDelegation> {
    static propsDefinition = {
        child: { type: PropTypes.Entity },
    };

    private child?: Entity;

    private owner?: Player;

    private serverPlayer?: Player;

    //Be aware that ownership transfer on Local entities are transfered on grab
    preStart() {
        this.owner = this.entity.owner.get();
        
        this.serverPlayer = this.world.getServerPlayer();

        this.child = this.props.child;
        this.child?.owner.set(this.owner);

        if (this.owner === this.serverPlayer) {
            // The entity is owned by the server player, so end the script
            return;
        }
        
        //Optionally, transfer ownership back to server on release.
        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnGrabEnd,
            this.onRelease.bind(this)
        );
    }

    private onRelease() {
        this.child?.owner.set(this.serverPlayer!);
    }

    start() {}
}

Component.register(LocalOwnershipDelegation);
