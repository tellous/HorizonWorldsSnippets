import * as hz from 'horizon/core';

class CompleteQuest extends hz.Component<typeof CompleteQuest> {
    start() {
        this.connectCodeBlockEvent(
            this.entity, 
            hz.CodeBlockEvents.OnGrabStart,
            this.onGrab.bind(this)
        );
    }

    onGrab(isRightHand: boolean, player: hz.Player) {
        //Asuming you have a quest called "MyQuest"
        player.setAchievementComplete("MyQuest", true);
    }
}

hz.Component.register(CompleteQuest);