import { Component } from 'horizon/core';

class SimpleTimer extends Component<typeof SimpleTimer> {
    private timeRemaining = 0;

    preStart() {
        // Start a countdown timer for 10 seconds
        this.timeRemaining = 10;

        // Log the initial time remaining
        const intervalId = this.async.setInterval(() => {
            this.timeRemaining--;
            console.log(`Time remaining: ${this.timeRemaining}`);

            if (this.timeRemaining === 0) {
                // Stop the timer when it reaches zero
                this.async.clearInterval(intervalId);
                console.log("Timer complete!");
            }
        }, 1000);
    }

    start() {
        // Intentionally left blank
    }
}

Component.register(SimpleTimer);