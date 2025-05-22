import { Component, CodeBlockEvents, AvatarGripPose, Player } from 'horizon/core';

// This only affects web and mobile.
class PoseOverride extends Component<typeof PoseOverride> {
    start() {}

    preStart() {
        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnGrabStart,
            this.onGrab.bind(this)
        );

        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnGrabEnd,
            this.onRelease.bind(this)
        );
    }

    private onGrab(isRightHand: boolean, player: Player) {
        player.setAvatarGripPoseOverride(AvatarGripPose.Sword);
    }

    private onRelease(player: Player) {
        player.clearAvatarGripPoseOverride();
    }
}

Component.register(PoseOverride);