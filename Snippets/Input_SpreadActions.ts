import { Component, PropTypes, Vec3, ParticleGizmo, AudioGizmo, CodeBlockEvents, World } from 'horizon/core';

class SpreadActions extends Component<typeof SpreadActions> {
    static propsDefinition = {
        particle: { type: PropTypes.Entity },
        audio: { type: PropTypes.Entity }
    };

    private actionsQueue: (() => void)[] = [];

    private actionPosition: Vec3 = Vec3.zero;

    private particle?: ParticleGizmo;

    private audio?: AudioGizmo;

    preStart() {
        this.particle = this.props.particle?.as(ParticleGizmo);

        this.audio = this.props.audio?.as(AudioGizmo);

        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnIndexTriggerDown,
            this.onTriggerDown.bind(this)
        );

        this.connectLocalBroadcastEvent(
            World.onUpdate,
            this.onUpdate.bind(this)
        );
    }

    start() {
        // Intentionally left blank
    }

    onTriggerDown() {
        this.actionsQueue.push(() => {
            this.actionPosition = this.entity.position.get();
        });

        this.actionsQueue.push(() => {
            this.entity.position.set(this.actionPosition);
        });

        this.actionsQueue.push(() => {
            this.particle?.play();
        });

        this.actionsQueue.push(() => {
            this.entity.position.set(this.actionPosition);
        });

        this.actionsQueue.push(() => {
            this.audio?.play();
        });
    }

    onUpdate(data: { deltaTime: number }) {
        if (this.actionsQueue.length === 0) {
            return;
        }
        const action = this.actionsQueue.shift();

        if (action) {
            action();
        }
    }

}
Component.register(SpreadActions);