import { CodeBlockEvents, Component, Player } from 'horizon/core';

//This is a static instance that can be accessed from any other component in the same scene.
export class StaticInstance extends Component<typeof StaticInstance> {

    static instance: StaticInstance;

    constructor() {
        super();
        StaticInstance.instance = this;
    }

    preStart() {
    }

    start() {
    }

    doSomething() {
        console.log('StaticInstance is doing something!');
    }
}
Component.register(StaticInstance);

// This script goes on a different entity, but it can access the StaticInstance
class AnotherComponent extends Component<typeof AnotherComponent> {
    preStart() {
        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnPlayerEnterTrigger,
            this.onPlayerEnter.bind(this)
        );
    }

    start() { 
    }

    onPlayerEnter(player: Player) {
        StaticInstance.instance.doSomething();
    }
}
Component.register(AnotherComponent);