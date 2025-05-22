import { UIComponent, Binding, View, UINode, Text } from 'horizon/ui';
import { PropTypes, GrabbableEntity, CodeBlockEvents } from 'horizon/core';

export class ConditionalUI extends UIComponent<typeof ConditionalUI> {
    static propsDefinition = {
        grabbable: { type: PropTypes.Entity }
    };

    private isRightHandBinding = new Binding(false);

    private grabbable?: GrabbableEntity;

    initializeUI() {
        return View({
            children: [
                UINode.if(
                    this.isRightHandBinding,
                    Text({
                        text: "Grabbed with Right Hand",
                    }),
                    Text({
                        text: "Grabbed with Left Hand",
                    })
                )
            ],
            style: {
                flex: 1
            }
        });
    }

    preStart() {
        this.grabbable = this.props.grabbable?.as(GrabbableEntity);

        if (!this.grabbable) {
            console.error("Grabbable entity is not set");
            return;
        }

        this.connectCodeBlockEvent(
            this.grabbable,
            CodeBlockEvents.OnGrabStart,
            this.onGrab.bind(this)
        );
    }

    start() {}

    private onGrab(isRightHand: boolean) {
        this.isRightHandBinding.set(isRightHand);
    }
}
UIComponent.register(ConditionalUI);
