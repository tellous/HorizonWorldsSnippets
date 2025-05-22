import { Component, PropTypes, CodeBlockEvents, TextGizmo, Player } from 'horizon/core';

class TextDisplay extends Component<typeof TextDisplay> {
    static propsDefinition = {
        text: { type: PropTypes.Entity }
    };

    textGizmo?: TextGizmo;

    preStart() {
        this.textGizmo = this.props.text?.as(TextGizmo);

        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnPlayerEnterWorld,
            this.onPlayerEnterTrigger.bind(this)
        );
    }

    start() {}

    private onPlayerEnterTrigger(player: Player) {
        this.textGizmo?.text.set("<color=red>Hello</color> <b>World</b>!");
    }
}

Component.register(TextDisplay);