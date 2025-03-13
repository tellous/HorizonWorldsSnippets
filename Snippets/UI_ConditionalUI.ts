import * as hz from 'horizon/core';
import * as hzui from 'horizon/ui';

export class ConditionalUI extends hzui.UIComponent<typeof ConditionalUI> {
    static propsDefinition = {
        grabbable: { type: hz.PropTypes.Entity }
    };

    private isRightHandBinding = new hzui.Binding(false);

    private grabbable?: hz.GrabbableEntity;

    initializeUI() {
        return hzui.View({
            children: [
                hzui.UINode.if(
                    this.isRightHandBinding,
                    hzui.Text({
                        text: "Grabbed with Right Hand",
                    }),
                    hzui.Text({
                        text: "Grabbed with Left Hand",
                    })
                )
            ],
            style: {
                flex: 1
            }
        });
    }

    start() {
        this.grabbable = this.props.grabbable?.as(hz.GrabbableEntity);

        if (!this.grabbable) {
            console.error("Grabbable entity is not set");
            return;
        }

        this.connectCodeBlockEvent(
            this.grabbable,
            hz.CodeBlockEvents.OnGrabStart,
            this.onGrab.bind(this)
        );
    }

    private onGrab(isRightHand: boolean) {
        this.isRightHandBinding.set(isRightHand);
    }
}
hzui.UIComponent.register(ConditionalUI);
