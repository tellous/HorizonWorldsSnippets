import { Component, MeshEntity, TextureAsset, CodeBlockEvents } from 'horizon/core';

class MeshTextureChanger extends Component<typeof MeshTextureChanger> {
    private mesh?: MeshEntity;

    preStart() {
        this.mesh = this.entity.as(MeshEntity);

        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnGrabStart,
            this.onGrab.bind(this)
        );
    }

    start() {
        // Intentionally left blank
    }

    onGrab() {
        //Replace with your texture ID
        const textureId = 0;

        this.mesh?.setTexture(new TextureAsset(BigInt(textureId)))
    }
}

Component.register(MeshTextureChanger);