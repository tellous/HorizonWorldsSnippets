import * as hz from 'horizon/core';

class FindByTag extends hz.Component<typeof FindByTag> {
    start() {
        // Find all entities with the tag 'Test'. Make sure there is at least one entity with this tag in the scene.
        const foundEntities = this.world.getEntitiesWithTags(['Test']);

        // Log the names of the found entities
        foundEntities.forEach(entity => {
            console.log(`Found entity with tag 'Test': ${entity.name.get()}`);
        });
    }
}

hz.Component.register(FindByTag);