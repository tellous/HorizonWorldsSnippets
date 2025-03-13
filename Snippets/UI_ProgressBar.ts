import * as hzui from 'horizon/ui';

export class ProgressBar extends hzui.UIComponent<typeof ProgressBar> {
    static propsDefinition = {};

    private animationValueBinding = new hzui.AnimatedBinding(0);

    private progressValueBinding = new hzui.Binding(0);

    private currentProgress = 0;

    private maxProgress = 100;

    //These 2 are for testing. They can be removed once you connect this component to an event
    private incrementAmount = 10;

    private incrementInterval = 3000; // 3 seconds

    start() {
        console.log('Bar component started');

        //Testing increment progress every 3 seconds
        this.async.setInterval(() => {
            this.incrementProgress({ incrementAmount: this.incrementAmount });
        }, this.incrementInterval);
    }

    initializeUI() {
        return hzui.View({
            children: [
                //Progress bar container
                hzui.View({
                    style: {
                        width: '100%',
                        height: 30,
                        backgroundColor: 'white',
                        borderRadius: 5,
                        overflow: 'hidden'
                    },
                    children: [
                        // Progress bar fill
                        hzui.View({
                            style: {
                                height: '100%',
                                backgroundColor: 'green',
                                width: this.animationValueBinding.interpolate([0, 1], ['0%', '100%']),
                                borderRadius: 5
                            }
                        })
                    ]
                }),
                // Progress text
                hzui.Text({
                    style: {
                        marginTop: 10,
                        color: 'white',
                        fontWeight: 'bold',
                        textAlign: 'center'
                    },
                    text: this.progressValueBinding.derive(v => `${Math.round(v * 100)}%`),
                })
            ],
            style: {
                flex: 1
            },
        });
    }

    private incrementProgress(data: { incrementAmount: number }) {
        if (this.currentProgress < this.maxProgress) {
            this.currentProgress += data.incrementAmount;
            // Ensure we don't exceed maxProgress
            if (this.currentProgress > this.maxProgress) {
                this.currentProgress = this.maxProgress;
            }

            const progressRatio = this.currentProgress / this.maxProgress;

            // Update the number binding with the current progress ratio
            this.progressValueBinding.set(progressRatio);

            // Animate to the new progress value
            this.animationValueBinding.set(
                hzui.Animation.timing(progressRatio, {
                    duration: 500,
                    easing: hzui.Easing.inOut(hzui.Easing.ease)
                })
            );
        }
    }
}
hzui.UIComponent.register(ProgressBar);
