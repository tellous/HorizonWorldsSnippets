import { Component, LocalEvent } from 'horizon/core';

const MyEvent = new LocalEvent<{ message: string }>();

//Both Scripts need to be in the same scene for this to work

//Script to send a local broadcast event
class EventSender extends Component<typeof EventSender> {
    preStart() {
        this.async.setTimeout(() => {
            this.sendLocalBroadcastEvent(MyEvent, { message: "Hello from EventSender!" });
        }, 1000);
    }
    start() {}
}
Component.register(EventSender);

//Script to receive a local broadcast event
class EventReceiver extends Component<typeof EventReceiver> {
    preStart() {
        this.connectLocalBroadcastEvent(MyEvent, this.handleEvent.bind(this));
    }
    start() {}
    private handleEvent(event: { message: string }) {
        console.log(`Received event with message: ${event.message}`);
    }
}
Component.register(EventReceiver);