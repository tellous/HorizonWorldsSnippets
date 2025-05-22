import { UIComponent, Text, View } from "horizon/ui";

export class TextFontsUI extends UIComponent<typeof TextFontsUI> {
    //Available fonts: 'Anton' | 'Bangers' | 'Kallisto' | 'Optimistic' | 'Oswald' | 'Roboto' | 'Roboto-Mono'
    initializeUI() {
        return View({
            children: [
                Text({
                    text: "Hello",
                    style: {
                        fontFamily: 'Anton',
                    }
                }),
                Text({
                    text: "Hello",
                    style: {
                        fontFamily: 'Bangers',
                    }
                }),
                Text({
                    text: "Hello",
                    style: {
                        fontFamily: 'Kallisto',
                    }
                }),
                Text({
                    text: "Hello",
                    style: {
                        fontFamily: 'Optimistic',
                    }
                }),
                Text({
                    text: "Hello",
                    style: {
                        fontFamily: 'Oswald',
                    }
                }),
                Text({
                    text: "Hello",
                    style: {
                        fontFamily: 'Roboto',
                    }
                }),
                Text({
                    text: "Hello",
                    style: {
                        fontFamily: 'Roboto-Mono',
                    }
                }),
            ]
        });
    }
}
UIComponent.register(TextFontsUI);
