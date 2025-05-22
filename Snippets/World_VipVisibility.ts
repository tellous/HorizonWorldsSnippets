import { Component, CodeBlockEvents, Player, PlayerVisibilityMode } from 'horizon/core';

class VipGrab extends Component<typeof VipGrab> {
    private vipList = [
        'Tellous'
    ];
    private whoCanSee: Player[] = [];

    preStart() {
        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnPlayerEnterWorld,
            this.onPlayerEnterWorld.bind(this)
        );
        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnPlayerExitWorld,
            this.onPlayerExitWorld.bind(this)
        );
    }

    start() {}

    onPlayerEnterWorld(player: Player) {
        if (this.vipList.includes(player.name.get())) {
            this.whoCanSee.push(player);
            this.entity.setVisibilityForPlayers(this.whoCanSee, PlayerVisibilityMode.VisibleTo);
        }
    }

    onPlayerExitWorld(player: Player) {
        if (this.vipList.includes(player.name.get())) {
            this.whoCanSee = this.whoCanSee.filter(p => p !== player);
            this.entity.setVisibilityForPlayers(this.whoCanSee, PlayerVisibilityMode.VisibleTo);
        }
    }
}

Component.register(VipGrab);