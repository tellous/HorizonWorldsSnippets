import { Component } from 'horizon/core';

class FindByTag extends Component<typeof FindByTag> {
    preStart() {
        // Find all entities with the tag 'Test'. Make sure there is at least one entity with this tag in the scene.
        const foundEntities = this.world.getEntitiesWithTags(['Test']);

        // Log the names of the found entities
        foundEntities.forEach(entity => {
            console.log(`Found entity with tag 'Test': ${entity.name.get()}`);
        });
    }

    start() {}
}

Component.register(FindByTag);