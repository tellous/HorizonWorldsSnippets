import { Component, PropTypes, Vec3 } from 'horizon/core';
import { AvatarAIAgent } from 'horizon/avatar_ai_agent';

class NpcAvatarMove extends Component<typeof NpcAvatarMove> {
    static propsDefinition = {
        destination: { type: PropTypes.Entity }
    };

    agent?: AvatarAIAgent;

    startPosition: Vec3 = Vec3.zero;

    endPosition: Vec3 = Vec3.zero;

    shouldMoveTowardsEnd = true;

    preStart() {
        this.agent = this.entity.as(AvatarAIAgent);

        this.startPosition = this.agent?.position.get() ?? Vec3.zero;

        this.endPosition = this.props.destination?.position.get() ?? Vec3.zero;

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

    start() {
        // Intentionally left blank
    }
}
Component.register(NpcAvatarMove);