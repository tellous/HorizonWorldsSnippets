import * as hz from 'horizon/core';

class VipGrab extends hz.Component<typeof VipGrab> {
    private vipList = [
        'Tellous'
    ]

    private whoCanSee: hz.Player[] = [];

    start() {
        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnPlayerEnterWorld,
            this.onPlayerEnterWorld.bind(this)
        )

        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnPlayerExitWorld,
            this.onPlayerExitWorld.bind(this)
        )
    }

    onPlayerEnterWorld(player: hz.Player) {
        // Check if the player is in the VIP list
        if (this.vipList.includes(player.name.get())) {
            // Add player to the list of players who can see the object
            this.whoCanSee.push(player);

            // Allow the player to see the object
            this.entity.setVisibilityForPlayers(this.whoCanSee, hz.PlayerVisibilityMode.VisibleTo);
        }
    }

    onPlayerExitWorld(player: hz.Player) {
        // Check if the player is in the VIP list
        if (this.vipList.includes(player.name.get())) {
            // Remove player from the list of players who can see the object
            this.whoCanSee = this.whoCanSee.filter(p => p !== player);

            // Hide the object from the player
            this.entity.setVisibilityForPlayers(this.whoCanSee, hz.PlayerVisibilityMode.VisibleTo);
        }
    }
}

hz.Component.register(VipGrab);