import { Component, CodeBlockEvents, Player } from 'horizon/core';

class UsePromise extends Component<typeof UsePromise> {
    preStart() {
        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnPlayerEnterTrigger,
            this.onPlayerEnter.bind(this)
        );
    }

    start() {
        // Intentionally left blank
    }

    onPlayerEnter(player: Player) {
        console.log(`${player.name.get()} entered the trigger`);

        this.createPromise()
            .then(() => {
                console.log("Promise resolved!");
            })
            .catch((error) => {
                console.error("Promise rejected:", error);
            });

        console.log("Promise created!");
    }

    createPromise(): Promise<void> {
        return new Promise((resolve, reject) => {
            console.log("Creating promise...");

            // Simulate an asynchronous operation
            this.async.setTimeout(() => {
                console.log("Timeout complete...");
                // Resolve the promise after 2 seconds
                resolve();
            }, 2000);
        });
    }
}

Component.register(UsePromise);