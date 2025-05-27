import { Component, CodeBlockEvents, PropTypes } from 'horizon/core';

class StopPhysicsSimulation extends Component<typeof StopPhysicsSimulation> {
    static propsDefinition = {
        physicsEntity: { type: PropTypes.Entity },
    };

    preStart() {
        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnPlayerEnterTrigger,
            this.OnPlayerEnterTrigger.bind(this)
        );
    }

    private OnPlayerEnterTrigger() {
        this.props.physicsEntity?.simulated.set(false);
    }

    start() { }
}

Component.register(StopPhysicsSimulation);