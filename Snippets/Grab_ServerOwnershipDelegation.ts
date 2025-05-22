import { Component, PropTypes, CodeBlockEvents, Entity, Player } from 'horizon/core';

class ServerOwnershipDelegation extends Component<typeof ServerOwnershipDelegation> {
    static propsDefinition = {
        child: { type: PropTypes.Entity },
    };

    private child?: Entity;

    private childOwner?: Player;

    private serverPlayer?: Player;

    preStart() {
        this.serverPlayer = this.world.getServerPlayer();

        this.child = this.props.child;

        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnGrabStart,
            this.onGrab.bind(this)
        );

        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnPlayerEnterWorld,
            this.onPlayerExitWorld.bind(this)
        );
    }

    start() {}

    private onGrab(isRightHand: boolean, player: Player) {
        this.childOwner = this.child?.owner.get();

        this.child?.owner.set(this.childOwner!);
    }

    private onPlayerExitWorld(player: Player) {
        if (this.childOwner === player) {
            this.child?.owner.set(this.serverPlayer!);
        }
    }
}

Component.register(ServerOwnershipDelegation);
