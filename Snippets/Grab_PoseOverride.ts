import * as hz from 'horizon/core';

// This only affects web and mobile.
class PoseOverride extends hz.Component<typeof PoseOverride> {
    start() {
        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnGrabStart,
            this.onGrab.bind(this)
        );

        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnGrabEnd,
            this.onRelease.bind(this)
        );
    }

    private onGrab(isRightHand: boolean, player: hz.Player) {
        player.setAvatarGripPoseOverride(hz.AvatarGripPose.Sword);
    }

    private onRelease(player: hz.Player) {
        player.clearAvatarGripPoseOverride();
    }
}

hz.Component.register(PoseOverride);