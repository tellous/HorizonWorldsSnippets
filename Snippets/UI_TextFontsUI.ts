import * as hzui from 'horizon/ui';

export class TextFontsUI extends hzui.UIComponent<typeof TextFontsUI> {
    //Available fonts: 'Anton' | 'Bangers' | 'Kallisto' | 'Optimistic' | 'Oswald' | 'Roboto' | 'Roboto-Mono'
    initializeUI() {
        return hzui.View({
            children: [
                hzui.Text({
                    text: "Hello",
                    style: {
                        fontFamily: 'Anton',
                    }
                }),
                hzui.Text({
                    text: "Hello",
                    style: {
                        fontFamily: 'Bangers',
                    }
                }),
                hzui.Text({
                    text: "Hello",
                    style: {
                        fontFamily: 'Kallisto',
                    }
                }),
                hzui.Text({
                    text: "Hello",
                    style: {
                        fontFamily: 'Optimistic',
                    }
                }),
                hzui.Text({
                    text: "Hello",
                    style: {
                        fontFamily: 'Oswald',
                    }
                }),
                hzui.Text({
                    text: "Hello",
                    style: {
                        fontFamily: 'Roboto',
                    }
                }),
                hzui.Text({
                    text: "Hello",
                    style: {
                        fontFamily: 'Roboto-Mono',
                    }
                }),
            ]
        });
    }
}
hzui.UIComponent.register(TextFontsUI);
