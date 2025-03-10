import * as hz from 'horizon/core';

class CollisionDetector extends hz.Component<typeof CollisionDetector> {
    private debounce = false;

    start() {
        // Set up collision handlers
        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnEntityCollision,
            this.onCollide.bind(this)
        );
    }

    private onCollide(other: hz.Entity) {
        if (!this.debounce) {
            // Ignore collisions if debounce is active
            return;
        }

        console.log(`Collision detected with ${other.name.get()}`);

        this.debounce = true;

        // Reset the debounce after 1 second
        this.async.setTimeout(() => {
            this.debounce = false;
        }, 1000); // Adjust the debounce time as needed
    }
}

hz.Component.register(CollisionDetector);