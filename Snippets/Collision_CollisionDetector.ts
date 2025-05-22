import { Component, CodeBlockEvents, Entity } from 'horizon/core';

class CollisionDetector extends Component<typeof CollisionDetector> {
    private debounce = false;

    start() {}

    preStart() {
        // Set up collision handlers
        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnEntityCollision,
            this.onCollide.bind(this)
        );
    }

    private onCollide(other: Entity) {
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

Component.register(CollisionDetector);