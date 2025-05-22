import { Component, Vec3, CodeBlockEvents, PhysicsForceMode, Entity, PhysicalEntity } from 'horizon/core';

class ApplyForce extends Component<typeof ApplyForce> {
    private forceStrength = Vec3.zero;

    preStart() {
        // Set the force strength to apply
        this.forceStrength = Vec3.up.mul(100);

        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnEntityEnterTrigger,
            this.onEntityEnterTrigger.bind(this)
        );
    }

    start() {
        // Intentionally left blank
    }

    onEntityEnterTrigger(entity: Entity) {
        const physicalEntity = entity.as(PhysicalEntity);
                
        physicalEntity.applyForce(this.forceStrength, PhysicsForceMode.Force);
    }
}

Component.register(ApplyForce);