import * as hzui from 'horizon/ui';

export class CardUI extends hzui.UIComponent<typeof CardUI> {
    initializeUI() {
        return hzui.View({
            children: [
                hzui.View({
                    children: [
                        //Title
                        hzui.View({
                            children: [
                                hzui.Text({
                                    text: "Card Title",
                                    style: {
                                        fontSize: 20,
                                        fontWeight: "bold",
                                        marginBottom: 10,
                                        color: "black",
                                        textAlign: "center",
                                    }
                                }),
                            ]
                        }),
                        //Image
                        hzui.View({
                            children: [
                                hzui.Text({
                                    text: "Image Placeholder",
                                    style: {
                                        fontSize: 16,
                                        color: "gray",
                                        textAlign: "center",
                                        backgroundColor: "lightgray",
                                        height: 100,
                                        width: 100,
                                    }
                                }),
                            ],
                            style: {
                                marginBottom: 10,
                                alignItems: "center",
                            }
                        }),
                        //Body
                        hzui.View({
                            children: [
                                hzui.Text({
                                    text: "This is a card component.\nIt can contain text, images, and other UI elements.",
                                    style: {
                                        fontSize: 16,
                                        color: "gray",
                                        textAlign: "center",
                                    }
                                })
                            ]
                        })
                    ],
                    style: {
                        backgroundColor: "white",
                        borderRadius: 10,
                        height: 300,
                        width: 200,
                        padding: 10,
                    }
                }),
            ],
            style: {
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }
        });
    }
}
hzui.UIComponent.register(CardUI);
