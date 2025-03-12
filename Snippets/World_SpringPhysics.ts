import * as hz from 'horizon/core';

// This must be used on an entity with Physics or Both (Grab & Physics)
class SpringPhysics extends hz.Component<typeof SpringPhysics> {
    physicalEntity?: hz.PhysicalEntity;

    start() {
        this.connectLocalBroadcastEvent(hz.World.onUpdate, this.update.bind(this));
    }

    private update(data: { deltaTime: number }) {
        // Always tries to move back to (0,0,0) when pushed with physics
        this.physicalEntity?.springPushTowardPosition(hz.Vec3.zero);

        // Always tries to rotate back to (0,0,0) when pushed with physics
        this.physicalEntity?.springSpinTowardRotation(hz.Quaternion.zero);
    }
}

hz.Component.register(SpringPhysics);