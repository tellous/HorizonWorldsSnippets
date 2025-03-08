import * as hz from 'horizon/core';

class PlayerOrbiter extends hz.Component<typeof PlayerOrbiter> {
    private target?: hz.Player;

    private radius: number = 2; // Radius of the orbit

    private timeElapsed = 0;

    private maxTime = 1; // Time in seconds to complete one orbit

    start() {

    }

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
        this.entity.position.set(new hz.Vec3(x, targetPos.y, z));

    }
}

hz.Component.register(PlayerOrbiter);