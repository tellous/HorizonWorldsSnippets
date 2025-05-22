import { Component, PropTypes, Vec3 } from 'horizon/core';
import { NavMeshAgent } from 'horizon/navmesh';

class NpcNavTest extends Component<typeof NpcNavTest> {
    static propsDefinition = {
        destination: { type: PropTypes.Entity }
    };

    agent?: NavMeshAgent;

    startPosition: Vec3 = Vec3.zero;

    endPosition: Vec3 = Vec3.zero;

    shouldMoveTowardsEnd = true;

    preStart() {
        this.agent = this.entity.as(NavMeshAgent);

        this.startPosition = this.agent?.position.get() ?? Vec3.zero;

        this.endPosition = this.props.destination?.position.get() ?? Vec3.zero;

        const destination = this.shouldMoveTowardsEnd
            ? this.endPosition
            : this.startPosition;

        this.agent?.destination.set(destination);

        this.async.setInterval(() => {
            //console.log('Moving agent to position:', this.shouldMoveTowardsEnd);
            this.shouldMoveTowardsEnd = !this.shouldMoveTowardsEnd;
            const targetPosition = this.shouldMoveTowardsEnd
                ? this.endPosition
                : this.startPosition;
            this.agent?.destination.set(targetPosition);
        }, 3000);
    }

    start() {
        // Intentionally left blank
    }
}
Component.register(NpcNavTest);