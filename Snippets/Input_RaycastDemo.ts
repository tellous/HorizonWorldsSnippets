import * as hz from 'horizon/core';

class RaycastDemo extends hz.Component<typeof RaycastDemo> {
    static propsDefinition = {
        ray: { type: hz.PropTypes.Entity }
    };

    private ray?: hz.RaycastGizmo;

    start() {
        this.ray = this.props.ray?.as(hz.RaycastGizmo);

        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnIndexTriggerDown,
            this.onIndexTriggerDown.bind(this)
        );
    }

    onIndexTriggerDown() {
        const origin = this.entity.position.get();
        const direction = new hz.Vec3(0, 0, 1).normalize();
        const rayData = this.ray?.raycast(origin, direction, { layerType: hz.LayerType.Objects, maxDistance: 100 });

        if (rayData) {
            if (rayData.targetType === hz.RaycastTargetType.Entity) {
                console.log(`Hit ${rayData.target.name} at distance ${rayData.distance}`);
            } else if (rayData.targetType === hz.RaycastTargetType.Static) {
                console.log(`Hit static object at distance ${rayData.distance}`);
            }
        } else{
            console.log("No hit detected");
        }
    }
}

hz.Component.register(RaycastDemo);