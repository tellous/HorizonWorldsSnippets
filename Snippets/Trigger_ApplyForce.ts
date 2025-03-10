import * as hz from 'horizon/core';

class ApplyForce extends hz.Component<typeof ApplyForce> {
    private forceStrength = hz.Vec3.zero;

    start() {
        // Set the force strength to apply
        this.forceStrength = hz.Vec3.up.mul(100);

        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnEntityEnterTrigger,
            this.onEntityEnterTrigger.bind(this)
        );
    }

    onEntityEnterTrigger(entity: hz.Entity) {
        const physicalEntity = entity.as(hz.PhysicalEntity);
                
        physicalEntity.applyForce(this.forceStrength, hz.PhysicsForceMode.Force);
    }
}

hz.Component.register(ApplyForce);