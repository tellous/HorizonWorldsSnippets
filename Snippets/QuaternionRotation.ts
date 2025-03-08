import * as hz from 'horizon/core';

class QuaternionRotation extends hz.Component<typeof QuaternionRotation> {
    static propsDefinition = {
        entity: { type: hz.PropTypes.Entity }
    };

    start() {
        // Create quaternions
        const identityRotation = hz.Quaternion.one;
        const xRotation = hz.Quaternion.fromEuler(new hz.Vec3(90, 0, 0)); // 90 degrees around X axis
        const yRotation = hz.Quaternion.fromEuler(new hz.Vec3(0, 90, 0)); // 90 degrees around Y axis
        
        // Combine rotations (order matters in quaternion multiplication)
        const combinedRotation = xRotation.mul(yRotation);
        
        // Convert quaternion back to euler angles (in degrees)
        const euler = combinedRotation.toEuler();
        console.log(`Rotation in Euler angles: (${euler.x}, ${euler.y}, ${euler.z})`);
        
        // Rotate an entity over time
        let angle = 0;
        this.async.setInterval(() => {
            if (this.props.entity) {
                angle += 1;
                // Rotate around Y axis
                const rotation = hz.Quaternion.fromEuler(new hz.Vec3(0, angle, 0));
                this.props.entity.rotation.set(rotation);
            }
        }, 50);
    }
}

hz.Component.register(QuaternionRotation);