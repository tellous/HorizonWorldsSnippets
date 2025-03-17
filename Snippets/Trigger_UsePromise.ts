import * as hz from 'horizon/core';

class UsePromise extends hz.Component<typeof UsePromise> {
    start() {
        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnPlayerEnterTrigger,
            this.onPlayerEnter.bind(this)
        );
    }

    onPlayerEnter(player: hz.Player) {
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

hz.Component.register(UsePromise);