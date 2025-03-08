import * as hz from 'horizon/core';

class LookAtTarget extends hz.Component<typeof LookAtTarget> {
    private target?: hz.Player;

    start() {
        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnPlayerEnterWorld,
            this.onPlayerEnter.bind(this)
        );

        this.connectLocalBroadcastEvent(
            hz.World.onUpdate,
            this.update.bind(this)
        );
    }

    private onPlayerEnter(player: hz.Player) {
        this.target = player;
    }
    
    private update() {
        if (this.target) {
            // Get the player's position and the entity's position
            const playerPos = this.target.position.get();
            const entityPos = this.entity.position.get();

            // Calculate the direction to look at
            const direction = playerPos.sub(entityPos).normalize();

            // Set the entity's rotation to look at the player
            this.entity.rotation.set(hz.Quaternion.lookRotation(direction, hz.Vec3.up));
        }
    }
}

hz.Component.register(LookAtTarget);