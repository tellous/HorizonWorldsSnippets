import * as hz from 'horizon/core';

class PopupDisplay extends hz.Component<typeof PopupDisplay> {
    start() {
        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnPlayerEnterWorld,
            this.onPlayerEnterWorld.bind(this)
        );
    }

    onPlayerEnterWorld(player: hz.Player) {
        this.world.ui.showPopupForPlayer(player, 'Welcome!', 5);
    }
}

hz.Component.register(PopupDisplay);