import * as hz from 'horizon/core';

class ShowToMobileOnly extends hz.Component<typeof ShowToMobileOnly> {
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
        const device = player.deviceType.get();
        
        if (device === hz.PlayerDeviceType.Mobile) {
            this.entity.visible.set(true);

            console.log('Mobile device detected, showing entity.');
        } else if (device === hz.PlayerDeviceType.Desktop) {
            this.entity.visible.set(false);

            console.log('Desktop device detected, hiding entity.');
        } else if (device === hz.PlayerDeviceType.VR) {
            this.entity.visible.set(false);

            console.log('VR device detected, hiding entity.');
        } else {
            this.entity.visible.set(false);

            console.log('Unknown device detected, hiding entity.');
        }
    }

    private onRelease(player: hz.Player) {
        this.entity.visible.set(false);
    }
}

hz.Component.register(ShowToMobileOnly);
