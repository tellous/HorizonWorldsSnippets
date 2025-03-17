import * as hz from 'horizon/core';
import * as hznpc from 'horizon/avatar_ai_agent';

class NpcAvatarMove extends hz.Component<typeof NpcAvatarMove> {
    static propsDefinition = {
        destination: { type: hz.PropTypes.Entity }
    };

    agent?: hznpc.AvatarAIAgent;

    startPosition: hz.Vec3 = hz.Vec3.zero;

    endPosition: hz.Vec3 = hz.Vec3.zero;

    shouldMoveTowardsEnd = true;

    start() {
        this.agent = this.entity.as(hznpc.AvatarAIAgent);

        this.startPosition = this.agent?.position.get() ?? hz.Vec3.zero;

        this.endPosition = this.props.destination?.position.get() ?? hz.Vec3.zero;

        this.agent?.locomotion.moveToPosition(this.shouldMoveTowardsEnd
            ? this.endPosition
            : this.startPosition
        );

        this.async.setInterval(() => {
            //console.log('Moving agent to position:', this.shouldMoveTowardsEnd);
            this.shouldMoveTowardsEnd = !this.shouldMoveTowardsEnd;
            const targetPosition = this.shouldMoveTowardsEnd
                ? this.endPosition
                : this.startPosition;
            this.agent?.locomotion.moveToPosition(targetPosition);
        }, 3000);
    }
}
hz.Component.register(NpcAvatarMove);