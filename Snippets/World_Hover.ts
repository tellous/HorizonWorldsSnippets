import { Component, Vec3, World } from 'horizon/core';

class Hover extends Component<typeof Hover> {
  private timeElapsed: number = 0;
  private maxTime: number = 3; // Time in seconds to complete a full rotation
  private amplitude: number = 1; // Amplitude of hover in meters
  private startPosition: Vec3 = Vec3.zero;

  preStart() {
    this.startPosition = this.entity.position.get();
    // Connect to update event to spin continuously
    this.connectLocalBroadcastEvent(
      World.onUpdate,
      this.update.bind(this)
    );
  }

  start() {}

  private update(data: { deltaTime: number }) {
    this.timeElapsed = Math.min(this.maxTime, this.timeElapsed + data.deltaTime);
    const value = this.timeElapsed / this.maxTime * Math.PI * 2; // Convert to radians
    const results = Math.cos(value);
    // Map sine result (-1 to 1) to a hover height
    const hoverHeight = this.amplitude * results; // 1 meter amplitude of hover
    // Set the new position
    const newPosition = this.startPosition.add(new Vec3(0, hoverHeight, 0));
    this.entity.position.set(newPosition);
    if (this.timeElapsed >= this.maxTime) {
      this.timeElapsed = 0; // Reset the timer for continuous hover
    }
  }
}
Component.register(Hover);