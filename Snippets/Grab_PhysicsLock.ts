import * as hz from 'horizon/core';

class PhysicsLock extends hz.Component<typeof PhysicsLock> {
    private physicsEntity?: hz.PhysicalEntity;

    start() {
        this.physicsEntity = this.entity.as(hz.PhysicalEntity);
        
        // Lock the physics entity to prevent it from moving
        this.physicsEntity.locked.set(true);

        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnGrabStart,
            this.onGrab.bind(this)
        );
        
        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnGrabEnd,
            this.onRelease.bind(this)
        );
    }
    
    onGrab() {
        console.log('Locked entity grabbed');
    }

    onRelease() {
        console.log('Locked entity released');
    }
}

hz.Component.register(PhysicsLock);