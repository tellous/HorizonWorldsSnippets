import { Component, CodeBlockEvents, Player } from 'horizon/core';

class CompleteQuest extends Component<typeof CompleteQuest> {
    preStart() {
        this.connectCodeBlockEvent(
            this.entity, 
            CodeBlockEvents.OnGrabStart,
            this.onGrab.bind(this)
        );
    }

    onGrab(isRightHand: boolean, player: Player) {
        //Asuming you have a quest called "MyQuest"
        player.setAchievementComplete("MyQuest", true);
    }

    start() {}
}

Component.register(CompleteQuest);