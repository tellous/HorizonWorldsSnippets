import * as hz from 'horizon/core';

class QuaternionRotation extends hz.Component<typeof QuaternionRotation> {
    static propsDefinition = {
        entity: { type: hz.PropTypes.Entity }
    };

    start() {
        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnPlayerEnterWorld,
            this.onPlayerEnterWorld.bind(this)
        );
    }

    onPlayerEnterWorld() {
        // Create quaternion
        const yRotation = hz.Quaternion.fromEuler(new hz.Vec3(0, 90, 0)); // 90 degrees around Y axis
        
        const currentRotation = this.entity.rotation.get();
        
        const newRotation = yRotation.mul(currentRotation);
        
        // Rotate 90 degrees around Y axis
        this.entity.rotation.set(newRotation);
    }
}

hz.Component.register(QuaternionRotation);