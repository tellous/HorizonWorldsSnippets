import * as hz from 'horizon/core';
import * as hznav from 'horizon/navmesh';

class NpcNavTest extends hz.Component<typeof NpcNavTest> {
    static propsDefinition = {
        destination: { type: hz.PropTypes.Entity }
    };

    agent?: hznav.NavMeshAgent;

    startPosition: hz.Vec3 = hz.Vec3.zero;

    endPosition: hz.Vec3 = hz.Vec3.zero;

    shouldMoveTowardsEnd = true;

    start() {
        this.agent = this.entity.as(hznav.NavMeshAgent);

        this.startPosition = this.agent?.position.get() ?? hz.Vec3.zero;

        this.endPosition = this.props.destination?.position.get() ?? hz.Vec3.zero;

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
}
hz.Component.register(NpcNavTest);