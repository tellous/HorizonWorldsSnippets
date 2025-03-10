import * as hz from 'horizon/core';
import * as hzui from 'horizon/ui';

export class ImageUI extends hzui.UIComponent<typeof ImageUI> {
    private textureId = 0;

    initializeUI() {
        return hzui.View({
            children: [
                hzui.Image({
                    source: hzui.ImageSource.fromTextureAsset(new hz.TextureAsset(BigInt(this.textureId)))
                })
            ],
            style: {
                flex: 1
            }
        });
    }
}
hzui.UIComponent.register(ImageUI);
