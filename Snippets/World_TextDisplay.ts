import * as hz from 'horizon/core';

class TextDisplay extends hz.Component<typeof TextDisplay> {
    static propsDefinition = {
        text: { type: hz.PropTypes.Entity }
    };

    textGizmo?: hz.TextGizmo;

    start() {
        this.textGizmo = this.props.text?.as(hz.TextGizmo);

        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnPlayerEnterWorld,
            this.onPlayerEnterTrigger.bind(this)
        );
    }

    private onPlayerEnterTrigger(player: hz.Player) {
        this.textGizmo?.text.set("<color=red>Hello</color> <b>World</b>!");
    }
}

hz.Component.register(TextDisplay);