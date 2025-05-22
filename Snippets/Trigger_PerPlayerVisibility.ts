import { Component, PropTypes, CodeBlockEvents, PlayerVisibilityMode, Entity, Player } from 'horizon/core';

class PerPlayerVisibility extends Component<typeof PerPlayerVisibility> {
    static propsDefinition = {
        entityToShow: { type: PropTypes.Entity }
    };

    private entityToShow?: Entity;

    private playersThatCanSee: Player[] = [];

    preStart() {
        this.entityToShow = this.props.entityToShow;

        //Hide from everyone
        this.entityToShow?.visible.set(false);

        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnPlayerEnterTrigger,
            this.OnPlayerEnterTrigger.bind(this)
        );

        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnPlayerExitTrigger,
            this.OnPlayerExitTrigger.bind(this)
        );
    }

    start() {}

    private OnPlayerEnterTrigger(player: Player) {
        this.playersThatCanSee.push(player);

        // Show the entity to the player
        this.entityToShow?.setVisibilityForPlayers(this.playersThatCanSee, PlayerVisibilityMode.VisibleTo);
    }

    private OnPlayerExitTrigger(player: Player) {
        this.playersThatCanSee = this.playersThatCanSee.filter(p => p !== player);

        this.entityToShow?.setVisibilityForPlayers(this.playersThatCanSee, PlayerVisibilityMode.VisibleTo);
    }
}

Component.register(PerPlayerVisibility);