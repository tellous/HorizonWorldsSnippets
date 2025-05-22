import { Component, CodeBlockEvents, Player } from 'horizon/core';

class PopupDisplay extends Component<typeof PopupDisplay> {
    preStart() {
        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnPlayerEnterWorld,
            this.onPlayerEnterWorld.bind(this)
        );
    }

    start() {}

    onPlayerEnterWorld(player: Player) {
        this.world.ui.showPopupForPlayer(player, 'Welcome!', 5);
    }
}

Component.register(PopupDisplay);