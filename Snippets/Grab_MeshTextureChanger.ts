import * as hz from 'horizon/core';

class MeshTextureChanger extends hz.Component<typeof MeshTextureChanger> {
    private mesh?: hz.MeshEntity;

    start() {
        this.mesh = this.entity.as(hz.MeshEntity);

        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnGrabStart,
            this.onGrab.bind(this)
        );
    }

    onGrab() {
        //Replace with your texture ID
        const textureId = 0;

        this.mesh?.setTexture(new hz.TextureAsset(BigInt(textureId)))
    }
}

hz.Component.register(MeshTextureChanger);