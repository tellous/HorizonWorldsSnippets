import { UIComponent, View, DynamicList, Text, Binding } from 'horizon/ui';
import { Color } from 'horizon/core';

class ListViewUI extends UIComponent<typeof ListViewUI> {
    private items = new Binding([
        { name: "Item 1" },
        { name: "Item 2" },
        { name: "Item 3" },
        { name: "Item 4" },
        { name: "Item 5" }
    ]);

    preStart() {}

    start() {}

    initializeUI() {
        return View({
            children: [
                DynamicList({
                    data: this.items,
                    renderItem: (item) => View({
                        style: {
                            backgroundColor: Color.red,
                            margin: 5,
                        },
                        children: Text({
                            text: item.name
                        })
                    }),
                    style: {
                        flex: 1
                    }
                })
            ],
            style: {
                flex: 1
            }
        });
    }
}

UIComponent.register(ListViewUI);
