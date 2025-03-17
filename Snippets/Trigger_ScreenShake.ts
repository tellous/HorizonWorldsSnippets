import * as hz from 'horizon/core';
import LocalCamera, * as hzcam from 'horizon/camera';

// See World_OwnershipManagement to manage ownership 
// This script must be set to "Local" execution mode in the editor.
class ScreenShake extends hz.Component<typeof ScreenShake> {
    private owner?: hz.Player;

    private serverPlayer?: hz.Player;

    private isShaking: boolean = false;

    private intensity: number = 0.05; // Intensity of position change in meters

    private duration: number = 1;

    private oscillations: number = 10;

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
        if (!this.isShaking) {
            this.startScreenShake();
        }
    }

    private async startScreenShake() {
        this.isShaking = true;

        // Store the original camera position
        const originalPosition = LocalCamera.position.get();

        // Calculate individual oscillation duration
        const oscillationDuration = this.duration / this.oscillations;

        // Create a series of random offsets for the camera position with decreasing intensity
        for (let i = 0; i < this.oscillations; i++) {
            // Calculate decreasing intensity for this oscillation
            const currentIntensity = this.intensity * (1 - i / this.oscillations);

            // Generate a random offset in all directions
            const offsetX = (Math.random() * 2 - 1) * currentIntensity;
            const offsetY = (Math.random() * 2 - 1) * currentIntensity;
            const offsetZ = (Math.random() * 2 - 1) * currentIntensity;

            // Apply the offset to the original position
            const newPosition = new hz.Vec3(
                originalPosition.x + offsetX,
                originalPosition.y + offsetY,
                originalPosition.z + offsetZ
            );

            // Apply the new position
            LocalCamera.setCameraModeFixed({
                position: newPosition,
                rotation: LocalCamera.rotation.get(),
                duration: oscillationDuration,
                easing: hzcam.Easing.EaseInOut
            });

            // Wait for half the oscillation duration
            await new Promise(resolve => {
                this.async.setTimeout(() => {
                    resolve(null);
                }, oscillationDuration * 500);
            });
        }

        // Return camera to original position
        LocalCamera.setCameraModeThirdPerson();

        this.isShaking = false;
    }
}

hz.Component.register(ScreenShake);