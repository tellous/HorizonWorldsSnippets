import { Component, CodeBlockEvents, PropTypes } from 'horizon/core';

class RemoveCollidability extends Component<typeof RemoveCollidability> {
    static propsDefinition = {
        collidable: { type: PropTypes.Entity },
    };

    preStart() {
        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnPlayerEnterTrigger,
            this.OnPlayerEnterTrigger.bind(this)
        );
    }

    private OnPlayerEnterTrigger() {
        this.props.collidable?.collidable.set(false);
    }

    start() { }
}

Component.register(RemoveCollidability);