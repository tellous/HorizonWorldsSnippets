import { UIComponent, View, ScrollView } from 'horizon/ui';

class ScrollViewUI extends UIComponent<typeof ScrollViewUI> {
    preStart() {}

    start() {}

    public initializeUI() {
        // Create a list of squares to fill the scroll view
        const squares = Array.from({ length: 20 }, (_, i) => View({
            style: {
                width: 50,
                height: 50,
                backgroundColor: 'black',
                margin: 10
            },
        }));

        return View({
            children: [
                ScrollView({
                    children: squares,
                    style: {
                        width: 300,
                        height: 300,
                        backgroundColor: 'white'
                    }
                })
            ],
            style: {
                flex: 1
            }
        });
    }
}
UIComponent.register(ScrollViewUI);
