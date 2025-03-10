import * as hz from 'horizon/core';

const MyEvent = new hz.LocalEvent<{ message: string }>();

//Both Scripts need to be in the same scene for this to work

//Script to send a local broadcast event
class EventSender extends hz.Component<typeof EventSender> {
    start() {
        this.async.setTimeout(() => {
            this.sendLocalBroadcastEvent(MyEvent, { message: "Hello from EventSender!" });
        });
    }
}
hz.Component.register(EventSender);


//Script to receive a local broadcast event
class EventReceiver extends hz.Component<typeof EventReceiver> {
    start() {
        this.connectLocalBroadcastEvent(MyEvent, this.handleEvent.bind(this));
    }

    private handleEvent(event: { message: string }) {
        console.log(`Received event with message: ${event.message}`);
    }
}
hz.Component.register(EventReceiver);