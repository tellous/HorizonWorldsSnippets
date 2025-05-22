import { Component, PhysicalEntity, CodeBlockEvents } from 'horizon/core';

class PhysicsLock extends Component<typeof PhysicsLock> {
    private physicsEntity?: PhysicalEntity;

    preStart() {
        this.physicsEntity = this.entity.as(PhysicalEntity);
        
        // Lock the physics entity to prevent it from moving
        this.physicsEntity.locked.set(true);

        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnGrabStart,
            this.onGrab.bind(this)
        );
        
        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnGrabEnd,
            this.onRelease.bind(this)
        );
    }
    
    start() {
        // Intentionally left blank
    }

    onGrab() {
        console.log('Locked entity grabbed');
    }

    onRelease() {
        console.log('Locked entity released');
    }
}

Component.register(PhysicsLock);