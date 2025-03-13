import * as hz from 'horizon/core';

class Hover extends hz.Component<typeof Hover> {
  private timeElapsed: number = 0;

  private maxTime: number = 3; // Time in seconds to complete a full rotation

  private amplitude: number = 1; // Amplitude of hover in meters

  private startPosition: hz.Vec3 = hz.Vec3.zero;

  start() {
    this.startPosition = this.entity.position.get();

    // Connect to update event to spin continuously
    this.connectLocalBroadcastEvent(
      hz.World.onUpdate,
      this.update.bind(this)
    );
  }

  private update(data: { deltaTime: number }) {
    this.timeElapsed = Math.min(this.maxTime, this.timeElapsed + data.deltaTime);

    const value = this.timeElapsed / this.maxTime * Math.PI * 2; // Convert to radians

    const results = Math.cos(value);

    // Map sine result (-1 to 1) to a hover height
    const hoverHeight = this.amplitude * results; // 1 meter amplitude of hover

    // Set the new position
    const newPosition = this.startPosition.add(new hz.Vec3(0, hoverHeight, 0));

    this.entity.position.set(newPosition);

    if (this.timeElapsed >= this.maxTime) {
      this.timeElapsed = 0; // Reset the timer for continuous hover
    }
  }
}
hz.Component.register(Hover);