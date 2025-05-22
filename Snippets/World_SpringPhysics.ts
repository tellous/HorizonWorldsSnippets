import { Component, PhysicalEntity, World, Vec3, Quaternion } from 'horizon/core';

// This must be used on an entity with Physics or Both (Grab & Physics)
class SpringPhysics extends Component<typeof SpringPhysics> {
    physicalEntity?: PhysicalEntity;

    preStart() {
        this.connectLocalBroadcastEvent(World.onUpdate, this.update.bind(this));
    }

    start() {}

    private update(data: { deltaTime: number }) {
        // Always tries to move back to (0,0,0) when pushed with physics
        this.physicalEntity?.springPushTowardPosition(Vec3.zero);

        // Always tries to rotate back to (0,0,0) when pushed with physics
        this.physicalEntity?.springSpinTowardRotation(Quaternion.zero);
    }
}

Component.register(SpringPhysics);