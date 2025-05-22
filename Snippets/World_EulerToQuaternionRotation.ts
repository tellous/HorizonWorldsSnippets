import { Component, PropTypes, CodeBlockEvents, Vec3, Quaternion } from 'horizon/core';

class EulerToQuaternionRotation extends Component<typeof EulerToQuaternionRotation> {
    static propsDefinition = {
        entity: { type: PropTypes.Entity }
    };

    preStart() {
        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnPlayerEnterWorld,
            this.onPlayerEnterWorld.bind(this)
        );
    }

    start() {}

    onPlayerEnterWorld() {
        // Create quaternion
        const yRotation = Quaternion.fromEuler(new Vec3(0, 90, 0)); // 90 degrees around Y axis
        const currentRotation = this.entity.rotation.get();
        const newRotation = yRotation.mul(currentRotation);
        // Rotate 90 degrees around Y axis
        this.entity.rotation.set(newRotation);
    }
}

Component.register(EulerToQuaternionRotation);