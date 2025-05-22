import { Component, CodeBlockEvents, World, Quaternion, Vec3, Player } from 'horizon/core';

class LookAtTarget extends Component<typeof LookAtTarget> {
    private target?: Player;

    preStart() {
        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnPlayerEnterWorld,
            this.onPlayerEnter.bind(this)
        );
        this.connectLocalBroadcastEvent(
            World.onUpdate,
            this.update.bind(this)
        );
    }

    start() {}

    private onPlayerEnter(player: Player) {
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
            this.entity.rotation.set(Quaternion.lookRotation(direction, Vec3.up));
        }
    }
}

Component.register(LookAtTarget);