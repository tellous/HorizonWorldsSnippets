import { Component, Player, Vec3 } from 'horizon/core';

class PlayerOrbiter extends Component<typeof PlayerOrbiter> {
    private target?: Player;

    private radius: number = 2; // Radius of the orbit

    private timeElapsed = 0;

    private maxTime = 1; // Time in seconds to complete one orbit

    preStart() {}

    start() {}

    update(data: { deltaTime: number }) {
        if (!this.target) {
            return;
        }
        this.timeElapsed = Math.min(this.maxTime, this.timeElapsed + data.deltaTime);
        const alpha = this.timeElapsed / this.maxTime;
        const angle = alpha * Math.PI * 2; // Full circle in radians
        const targetPos = this.target.position.get();
        const x = targetPos.x + Math.cos(angle) * this.radius;
        const z = targetPos.z + Math.sin(angle) * this.radius;
        this.entity.position.set(new Vec3(x, targetPos.y, z));
    }
}

Component.register(PlayerOrbiter);