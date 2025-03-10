import * as hz from 'horizon/core';

class CheckParallel extends hz.Component<typeof CheckParallel> {
    static propsDefinition = {
        entity: { type: hz.PropTypes.Entity }
    };

    start() {
        this.connectLocalBroadcastEvent(
            hz.World.onUpdate,
            this.onUpdate.bind(this)
        );
    }

    onUpdate() {    
          // Dot product (scalar)
          const dot = this.entity.up.get().dot(hz.Vec3.up);

          if (dot === 0) {
              console.log("Entity Up is perpendicular with World Up");
          } else if (dot === 1) {
              console.log("Entity Up is parallel with World Up");
          } else if(dot === -1) {
              console.log("Entity Up is parallel with World Down");
          }
    }
}

hz.Component.register(CheckParallel);