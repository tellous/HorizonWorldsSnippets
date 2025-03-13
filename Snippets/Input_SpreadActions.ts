import * as hz from 'horizon/core';

class SpreadActions extends hz.Component<typeof SpreadActions> {
    static propsDefinition = {
        particle: { type: hz.PropTypes.Entity },
        audio: { type: hz.PropTypes.Entity }
    };

    private actionsQueue: (() => void)[] = [];

    private actionPosition: hz.Vec3 = hz.Vec3.zero;

    private particle?: hz.ParticleGizmo;

    private audio?: hz.AudioGizmo;

    start() {
        this.particle = this.props.particle?.as(hz.ParticleGizmo);

        this.audio = this.props.audio?.as(hz.AudioGizmo);

        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnIndexTriggerDown,
            this.onTriggerDown.bind(this)
        );

        this.connectLocalBroadcastEvent(
            hz.World.onUpdate,
            this.onUpdate.bind(this)
        );
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
hz.Component.register(SpreadActions);