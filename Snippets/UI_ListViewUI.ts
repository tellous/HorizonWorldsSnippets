import * as hzui from 'horizon/ui';
import * as hz from 'horizon/core';

export class ListViewUI extends hzui.UIComponent<typeof ListViewUI> {
    private items = new hzui.Binding([
        { name: "Item 1" },
        { name: "Item 2" },
        { name: "Item 3" },
        { name: "Item 4" },
        { name: "Item 5" }
    ]);

    initializeUI() {
        return hzui.View({
            children: [
                hzui.DynamicList({
                    data: this.items,
                    renderItem: (item) => hzui.View({
                        style: {
                            backgroundColor: hz.Color.red,
                            margin: 5,
                        },
                        children: hzui.Text({
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
hzui.UIComponent.register(ListViewUI);
