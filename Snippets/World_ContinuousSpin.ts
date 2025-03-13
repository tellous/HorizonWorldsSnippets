import * as hz from 'horizon/core';

class ContinuousSpin extends hz.Component<typeof ContinuousSpin> {
  private timeElapsed: number = 0;

  private amplitude: number = 45; // Amplitude of rotation in degrees/sec

  start() {
    this.connectLocalBroadcastEvent(
      hz.World.onUpdate,
      this.update.bind(this)
    );
  }

  private update(data: { deltaTime: number }) {
    this.timeElapsed += data.deltaTime * this.amplitude;
    this.timeElapsed %= 360; // keep angle within 0-360 degrees
    
    const rotation = hz.Quaternion.fromEuler(new hz.Vec3(0, this.timeElapsed, 0));
    this.entity.rotation.set(rotation);
  }
}
hz.Component.register(ContinuousSpin);