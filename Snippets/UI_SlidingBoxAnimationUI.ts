import * as hzui from 'horizon/ui';

export class SlidingBoxAnimationUI extends hzui.UIComponent<typeof SlidingBoxAnimationUI> {
    private animatedValue = new hzui.AnimatedBinding(0);

    start() {
        // Start the animation
        this.animateBox();
    }

    animateBox() {
        this.animatedValue.set(
            hzui.Animation.timing(1, {
                duration: 1000,
                easing: hzui.Easing.inOut(hzui.Easing.ease)
            }),
            () => {
                // Reset and repeat
                this.animatedValue.set(
                    hzui.Animation.timing(0, {
                        duration: 1000,
                        easing: hzui.Easing.inOut(hzui.Easing.ease)
                    }),
                    () => this.animateBox()
                );
            }
        );
    }

    initializeUI() {
        return hzui.View({
            children: [
                hzui.View({
                    style: {
                        width: 100,
                        height: 100,
                        backgroundColor: 'black',
                        transform: [
                            { translateX: this.animatedValue.interpolate([0, 1], [0, 200]) }
                        ]
                    }
                })
            ],
            style: {
                flex: 1
            }
        });
    }
}
hzui.UIComponent.register(SlidingBoxAnimationUI);
