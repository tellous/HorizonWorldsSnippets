import * as hz from 'horizon/core';

class Oscillate extends hz.Component<typeof Oscillate> {
  private timeElapsed: number = 0;

  private maxTime: number = 5; // Time in seconds to complete a full rotation

  private amplitude: number = 45; // Amplitude of oscillation in degrees

  start() {
    // Connect to update event to spin continuously
    this.connectLocalBroadcastEvent(
      hz.World.onUpdate,
      this.update.bind(this)
    );
  }

  private update(data: { deltaTime: number }) {
    this.timeElapsed = Math.min(this.maxTime, this.timeElapsed + data.deltaTime);

    const value = this.timeElapsed / this.maxTime * Math.PI * 2; // Convert to radians
    const results = Math.sin(value);
    
    // Map sine result (-1 to 1) to a rotation angle
    const rotationAngle = this.amplitude * results; // 45 degrees amplitude of oscillation
    
    // Create rotation quaternion directly
    const rotation = hz.Quaternion.fromEuler(new hz.Vec3(0, rotationAngle, 0));
    
    // Set the absolute rotation
    this.entity.rotation.set(rotation);

    if (this.timeElapsed >= this.maxTime) {
      this.timeElapsed = 0; // Reset the timer for continuous oscillation
    }
  }
}
hz.Component.register(Oscillate);