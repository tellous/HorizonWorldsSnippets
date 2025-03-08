import * as hz from 'horizon/core';

class MeshTint extends hz.Component<typeof MeshTint> {

    private mesh?: hz.MeshEntity;

    start() {
        this.mesh = this.entity.as(hz.MeshEntity);

        // Set up the mesh to be tinted
        this.mesh.style.tintColor.set(hz.Color.red);
        this.mesh.style.tintStrength.set(1);

        // Set up the event to change the tint color
        this.async.setTimeout(() => {
            this.mesh?.style.tintColor.set(hz.Color.fromHex("#AAFF00"));
        }, 3000);
    }
}

hz.Component.register(MeshTint);