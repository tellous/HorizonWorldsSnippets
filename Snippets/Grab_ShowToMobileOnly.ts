import { Component, Player, PlayerDeviceType, CodeBlockEvents } from 'horizon/core';

class ShowToMobileOnly extends Component<typeof ShowToMobileOnly> {
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

    start() {
        // Intentionally left blank
    }

    private onGrab(isRightHand: boolean, player: Player) {
        const device = player.deviceType.get();
        
        if (device === PlayerDeviceType.Mobile) {
            this.entity.visible.set(true);

            console.log('Mobile device detected, showing entity.');
        } else if (device === PlayerDeviceType.Desktop) {
            this.entity.visible.set(false);

            console.log('Desktop device detected, hiding entity.');
        } else if (device === PlayerDeviceType.VR) {
            this.entity.visible.set(false);

            console.log('VR device detected, hiding entity.');
        } else {
            this.entity.visible.set(false);

            console.log('Unknown device detected, hiding entity.');
        }
    }

    private onRelease(player: Player) {
        this.entity.visible.set(false);
    }
}

Component.register(ShowToMobileOnly);
