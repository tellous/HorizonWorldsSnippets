import { Component, PropTypes, Entity, Vec3, Quaternion, World } from 'horizon/core';

class ConnectedLine extends Component<typeof ConnectedLine> {
    static propsDefinition = {
        line: { type: PropTypes.Entity }
    };

    private line?: Entity;
    private startPosition: Vec3 = Vec3.zero;
    private lineScale: Vec3 = Vec3.zero;

    preStart() {
        this.line = this.props.line;
        this.lineScale = this.line?.scale.get() ?? Vec3.one;
        this.startPosition = this.line?.position.get() ?? Vec3.zero;
        this.connectLocalBroadcastEvent(
            World.onUpdate,
            this.onUpdate.bind(this)
        );
    }

    start() {}

    onUpdate() {
        const endPosition = this.entity.position.get();
        const midPoint = this.startPosition.add(endPosition).mul(0.5);
        this.line?.position.set(midPoint);

        //Assumes your line object is 1 meter long on Z axis
        const lineLength = this.startPosition.distance(endPosition);
        const newScale = new Vec3(this.lineScale.x, this.lineScale.y, lineLength);
        this.line?.scale.set(newScale);

        const direction = endPosition.sub(this.startPosition).normalize();
        const rotation = Quaternion.lookRotation(direction, Vec3.up);
        this.line?.rotation.set(rotation);
    }
}

Component.register(ConnectedLine);