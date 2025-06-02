import { Component, CodeBlockEvents, Player, PropTypes } from 'horizon/core';
import { SublevelEntity } from 'horizon/world_streaming';

// Example: Stream in a region when a player enters a trigger
class WorldStreamingTrigger extends Component<typeof WorldStreamingTrigger> {
    static propsDefinition = {
        sublevel: { type: PropTypes.Entity },
        state: { type: 'number', default: 2 }, // 0: Unloaded, 1: Loaded, 2: Active, 3: Paused, 4: Hidden
    };

    preStart() {
        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnPlayerEnterTrigger,
            this.onPlayerEnterTrigger.bind(this)
        );
    }

    start() {}

    private async onPlayerEnterTrigger(player: Player) {
        const sublevel = this.props.sublevel?.as(SublevelEntity);
        const state = this.props.state;
        if (!sublevel) {
            console.log("The sublevel entity was either null or invalid.");
            return;
        }
        console.log(`Sublevel Trigger entered. Trying to set sublevel ${sublevel.toString()} to state ${state}, current state is ${sublevel.currentState.get()}, previous target state is ${sublevel.targetState.get()}`);
        switch (state) {
            case 0:
                await sublevel.unload();
                console.log(`Sublevel ${sublevel.toString()} is now unloaded!`);
                break;
            case 1:
                await sublevel.load();
                console.log(`Sublevel ${sublevel.toString()} is now loaded!`);
                break;
            case 2:
                await sublevel.activate();
                console.log(`Sublevel ${sublevel.toString()} is now activated!`);
                break;
            case 3:
                await sublevel.pause();
                console.log(`Sublevel ${sublevel.toString()} is now paused!`);
                break;
            case 4:
                await sublevel.hide();
                console.log(`Sublevel ${sublevel.toString()} is now hidden!`);
                break;
            default:
                console.log(`Invalid/Unexpected sublevel state # given: ${state}`);
                break;
        }
    }
}

Component.register(WorldStreamingTrigger);
