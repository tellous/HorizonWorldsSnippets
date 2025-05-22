import { Component, MeshEntity, Color, Vec3 } from 'horizon/core';

class RainbowCycle extends Component<typeof RainbowCycle> {
  private mesh?: MeshEntity;

  private hue: number = 0;

  private speed = 0.9; // Speed of the color change. For best results, keep it low.

  preStart() {
    this.mesh = this.entity.as(MeshEntity);

    this.mesh.style.tintStrength.set(1); // Set the tint strength to 1 for full effect

    this.async.setInterval(
      () => { this.cycle(); },
      50 // Update every second. Increase for slower cycles
    );
  }

  start() {}

  cycle() {
    // Increment the hue value based on deltaTime
    this.hue = (this.hue + this.speed) % 1; // Wrap around at 1

    // Convert HSV to RGB and set the color
    const color = Color.fromHSV(new Vec3(this.hue, 1, 1)); // Full saturation and value
    
    this.mesh?.style.tintColor.set(color);
  }
}

Component.register(RainbowCycle);