import { UIComponent, View, Image, ImageSource } from 'horizon/ui';
import { TextureAsset } from 'horizon/core';

class ImageUI extends UIComponent<typeof ImageUI> {
    private textureId = 0;

    preStart() {}

    start() {}

    public initializeUI() {
        return View({
            children: [
                Image({
                    source: ImageSource.fromTextureAsset(new TextureAsset(BigInt(this.textureId)))
                })
            ],
            style: {
                flex: 1
            }
        });
    }
}
UIComponent.register(ImageUI);
