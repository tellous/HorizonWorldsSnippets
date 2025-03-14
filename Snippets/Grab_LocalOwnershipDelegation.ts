import * as hz from 'horizon/core';

// This script must be set to "Local" execution mode in the editor.
class LocalOwnershipDelegation extends hz.Component<typeof LocalOwnershipDelegation> {
    static propsDefinition = {
        child: { type: hz.PropTypes.Entity },
    };

    private child?: hz.Entity;

    private owner?: hz.Player;

    private serverPlayer?: hz.Player;

    //Be aware that ownership transfer on Local entities are transfered on grab
    start() {
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
            hz.CodeBlockEvents.OnGrabEnd,
            this.onRelease.bind(this)
        );
    }

    private onRelease() {
        this.child?.owner.set(this.serverPlayer!);
    }
}

hz.Component.register(LocalOwnershipDelegation);
