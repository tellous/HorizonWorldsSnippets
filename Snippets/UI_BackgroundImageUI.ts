import { UIComponent, View, Image, Text, ImageSource } from 'horizon/ui';
import { TextureAsset } from 'horizon/core';

class BackgroundImageUI extends UIComponent<typeof BackgroundImageUI> {
    preStart() {}

    start() {}

    initializeUI() {
        return View({
            children: [
                Image({
                    source: ImageSource.fromTextureAsset(new TextureAsset(BigInt(0))),
                    style: {
                        width: '100%',
                        height: '100%',
                        position: 'absolute'
                    }
                }),
                Text({
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
UIComponent.register(BackgroundImageUI);
