import * as hz from 'horizon/core';
import * as hzui from 'horizon/ui';

export class BackgroundImageUI extends hzui.UIComponent<typeof BackgroundImageUI> {
    initializeUI() {
        return hzui.View({
            children: [
                hzui.Image({
                    source: hzui.ImageSource.fromTextureAsset(new hz.TextureAsset(BigInt(0))),
                    style: {
                        width: '100%',
                        height: '100%',
                        position: 'absolute'
                    }
                }),
                hzui.Text({
                    text: "Hello World",
                    style: {
                        flex: 1,
                        textAlign: 'center',
                        textAlignVertical: 'center',
                    }
                })
            ],
            style: {
                flex: 1
            }
        });
    }
}
hzui.UIComponent.register(BackgroundImageUI);
