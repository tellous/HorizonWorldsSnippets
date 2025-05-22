import { Component, PropTypes, CodeBlockEvents, Vec3, LayerType, RaycastGizmo, RaycastTargetType } from 'horizon/core';

class RaycastDemo extends Component<typeof RaycastDemo> {
    static propsDefinition = {
        ray: { type: PropTypes.Entity }
    };

    private ray?: RaycastGizmo;

    preStart() {
        this.ray = this.props.ray?.as(RaycastGizmo);

        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnIndexTriggerDown,
            this.onIndexTriggerDown.bind(this)
        );
    }

    start() {
        // Intentionally left blank
    }

    onIndexTriggerDown() {
        const origin = this.entity.position.get();
        const direction = new Vec3(0, 0, 1).normalize();
        const rayData = this.ray?.raycast(origin, direction, { layerType: LayerType.Objects, maxDistance: 100 });

        if (rayData) {
            if (rayData.targetType === RaycastTargetType.Entity) {
                console.log(`Hit ${rayData.target.name} at distance ${rayData.distance}`);
            } else if (rayData.targetType === RaycastTargetType.Static) {
                console.log(`Hit static object at distance ${rayData.distance}`);
            }
        } else{
            console.log("No hit detected");
        }
    }
}

Component.register(RaycastDemo);