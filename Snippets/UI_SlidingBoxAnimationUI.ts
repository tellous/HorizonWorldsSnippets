import { UIComponent, AnimatedBinding, Animation, Easing, View } from 'horizon/ui';

class SlidingBoxAnimationUI extends UIComponent<typeof SlidingBoxAnimationUI> {
    private animatedValue = new AnimatedBinding(0);

    preStart() {
        // Start the animation
        this.animateBox();
    }

    animateBox() {
        this.animatedValue.set(
            Animation.timing(1, {
                duration: 1000,
                easing: Easing.inOut(Easing.ease)
            }),
            () => {
                // Reset and repeat
                this.animatedValue.set(
                    Animation.timing(0, {
                        duration: 1000,
                        easing: Easing.inOut(Easing.ease)
                    }),
                    () => this.animateBox()
                );
            }
        );
    }

    initializeUI() {
        return View({
            children: [
                View({
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
UIComponent.register(SlidingBoxAnimationUI);
