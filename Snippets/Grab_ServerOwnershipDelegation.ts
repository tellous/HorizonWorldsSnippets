import * as hz from 'horizon/core';

class ServerOwnershipDelegation extends hz.Component<typeof ServerOwnershipDelegation> {
    static propsDefinition = {
        child: { type: hz.PropTypes.Entity },
    };

    private child?: hz.Entity;

    private childOwner?: hz.Player;

    private serverPlayer?: hz.Player;

    start() {
        this.serverPlayer = this.world.getServerPlayer();

        this.child = this.props.child;

        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnGrabStart,
            this.onGrab.bind(this)
        );

        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnPlayerEnterWorld,
            this.onPlayerExitWorld.bind(this)
        );
    }

    private onGrab(isRightHand: boolean, player: hz.Player) {
        this.childOwner = this.child?.owner.get();

        this.child?.owner.set(this.childOwner!);
    }

    private onPlayerExitWorld(player: hz.Player) {
        if (this.childOwner === player) {
            this.child?.owner.set(this.serverPlayer!);
        }
    }
}

hz.Component.register(ServerOwnershipDelegation);
