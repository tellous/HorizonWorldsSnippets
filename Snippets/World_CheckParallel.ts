import { Component, PropTypes, Vec3, World } from 'horizon/core';

class CheckParallel extends Component<typeof CheckParallel> {
    static propsDefinition = {
        entity: { type: PropTypes.Entity }
    };

    preStart() {
        this.connectLocalBroadcastEvent(
            World.onUpdate,
            this.onUpdate.bind(this)
        );
    }

    start() {}

    onUpdate() {
        // Dot product (scalar)
        const dot = this.entity.up.get().dot(Vec3.up);
        if (dot === 0) {
            console.log("Entity Up is perpendicular with World Up");
        } else if (dot === 1) {
            console.log("Entity Up is parallel with World Up");
        } else if (dot === -1) {
            console.log("Entity Up is parallel with World Down");
        }
    }
}

Component.register(CheckParallel);