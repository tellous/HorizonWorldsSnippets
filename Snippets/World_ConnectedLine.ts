import * as hz from 'horizon/core';

class ConnectedLine extends hz.Component<typeof ConnectedLine> {
    static propsDefinition = {
        line: { type: hz.PropTypes.Entity }
    };

    private line?: hz.Entity;

    private startPosition: hz.Vec3 = hz.Vec3.zero;

    private lineScale: hz.Vec3 = hz.Vec3.zero;

    start() {
        this.line = this.props.line;
        this.lineScale = this.line?.scale.get() ?? hz.Vec3.one;

        this.startPosition = this.line?.position.get() ?? hz.Vec3.zero;

        this.connectLocalBroadcastEvent(
            hz.World.onUpdate,
            this.onUpdate.bind(this)
        );
    }

    onUpdate() {
        const endPosition = this.entity.position.get();
        const midPoint = this.startPosition.add(endPosition).mul(0.5);
        this.line?.position.set(midPoint);

        //Assumes your line object is 1 meter long on Z axis
        const lineLength = this.startPosition.distance(endPosition);
        const newScale = new hz.Vec3(this.lineScale.x, this.lineScale.y, lineLength);
        this.line?.scale.set(newScale);

        const direction = endPosition.sub(this.startPosition).normalize();
        const rotation = hz.Quaternion.lookRotation(direction, hz.Vec3.up);
        this.line?.rotation.set(rotation);
    }
}
hz.Component.register(ConnectedLine);