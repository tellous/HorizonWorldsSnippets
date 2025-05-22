import { Component, MeshEntity, Color } from 'horizon/core';

class MeshTint extends Component<typeof MeshTint> {

    private mesh?: MeshEntity;

    preStart() {
        this.mesh = this.entity.as(MeshEntity);

        // Set up the mesh to be tinted
        this.mesh.style.tintColor.set(Color.red);
        this.mesh.style.tintStrength.set(1);

        // Set up the event to change the tint color
        this.async.setTimeout(() => {
            this.mesh?.style.tintColor.set(Color.fromHex("#AAFF00"));
        }, 3000);
    }

    start() {
        // Intentionally left blank
    }
}

Component.register(MeshTint);