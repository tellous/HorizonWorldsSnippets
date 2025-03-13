import * as hz from 'horizon/core';

class PerPlayerVisibility extends hz.Component<typeof PerPlayerVisibility> {
    static propsDefinition = {
        entityToShow: { type: hz.PropTypes.Entity }
    };

    private entityToShow?: hz.Entity;

    private playersThatCanSee: hz.Player[] = [];

    start() {
        this.entityToShow = this.props.entityToShow;

        //Hide from everyone
        this.entityToShow?.visible.set(false);

        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnPlayerEnterTrigger,
            this.OnPlayerEnterTrigger.bind(this)
        );

        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnPlayerExitTrigger,
            this.OnPlayerExitTrigger.bind(this)
        );
    }

    private OnPlayerEnterTrigger(player: hz.Player) {
        this.playersThatCanSee.push(player);

        // Show the entity to the player
        this.entityToShow?.setVisibilityForPlayers(this.playersThatCanSee, hz.PlayerVisibilityMode.VisibleTo);
    }

    private OnPlayerExitTrigger(player: hz.Player) {
        this.playersThatCanSee = this.playersThatCanSee.filter(p => p !== player);

        this.entityToShow?.setVisibilityForPlayers(this.playersThatCanSee, hz.PlayerVisibilityMode.VisibleTo);
    }
}

hz.Component.register(PerPlayerVisibility);