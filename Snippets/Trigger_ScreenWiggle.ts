import * as hz from 'horizon/core';
import LocalCamera, * as hzcam from 'horizon/camera';

// See World_OwnershipManagement to manage ownership 
// This script must be set to "Local" execution mode in the editor.
class ScreenWiggle extends hz.Component<typeof ScreenWiggle> {
    private owner?: hz.Player;

    private serverPlayer?: hz.Player;

    private isWiggling: boolean = false;

    private intensity: number = 5;

    private duration: number = 1;

    private oscillations: number = 4;

    start() {
        // The player will own the entity when it is grabbed
        this.owner = this.entity.owner.get();

        this.serverPlayer = this.world.getServerPlayer();

        // Check if the entity is owned by a player
        if (this.owner === this.serverPlayer) {
            // The entity is owned by the server player, so end the script
            return;
        }

        this.connectCodeBlockEvent(this.entity, hz.CodeBlockEvents.OnPlayerEnterTrigger, this.onPlayerEnterTrigger.bind(this));
    }

    private onPlayerEnterTrigger() {
        // Only start a new shake if we're not already shaking
        if (!this.isWiggling) {
            this.startScreenWiggle();
        }
    }

    private async startScreenWiggle() {
        this.isWiggling = true;

        // Calculate individual oscillation duration
        const oscillationDuration = this.duration / this.oscillations;

        // Create a series of alternating camera rolls with decreasing intensity
        for (let i = 0; i < this.oscillations; i++) {
            // Calculate decreasing intensity for this oscillation
            const currentIntensity = this.intensity * (1 - i / this.oscillations);

            // Alternate between positive and negative roll angles
            const rollAngle = (i % 2 === 0) ? currentIntensity : -currentIntensity;

            // Set the camera roll with easing for a smooth transition
            await LocalCamera.setCameraRollWithOptions(rollAngle, {
                duration: oscillationDuration / 2,
                easing: hzcam.Easing.EaseInOut
            });
        }

        // Return camera to normal
        await LocalCamera.setCameraRollWithOptions(0, {
            duration: oscillationDuration,
            easing: hzcam.Easing.EaseOut
        });

        this.isWiggling = false;
    }
}

hz.Component.register(ScreenWiggle);