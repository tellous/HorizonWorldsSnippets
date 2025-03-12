import * as hz from 'horizon/core';

type ObjectPoolData = {
    inUse: boolean;
};

class UseObjectPool extends hz.Component<typeof UseObjectPool> {
    private objects = new Map<hz.Entity, ObjectPoolData>();

    poolPosition: hz.Vec3 = hz.Vec3.zero;

    start() {
        this.poolPosition = this.entity.position.get();

        //Make sure to tag the entities you want to use with "Object"
        //Find all tagged entities
        const taggedEntities = this.world.getEntitiesWithTags(['Object']);

        // Iterate through each tagged entity
        for (const entity of taggedEntities) {
            // Add the entity to the object pool
            this.objects.set(entity, { inUse: false });

            // Set the entity's position to the pool position
            entity.position.set(this.poolPosition);
            entity.rotation.set(hz.Quaternion.zero);
        }

        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnPlayerEnterTrigger,
            this.onPlayerEnterTrigger.bind(this)
        );

        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnPlayerExitTrigger,
            this.onPlayerExitTrigger.bind(this)
        );
    }

    onPlayerEnterTrigger(player: hz.Player) {
        // Check if there are any available objects in the pool
        const availableObject = Array.from(this.objects.entries()).find(([_, data]) => !data.inUse);
        if (availableObject) {
            const [entity, data] = availableObject;

            // Mark the object as in use
            data.inUse = true;

            this.objects.set(entity, data);

            // Move the object to the pool position
            const inFrontOfPlayer = player.position.get().add(player.forward.get());
            entity.position.set(inFrontOfPlayer);

            return;
        }

        console.log('No available objects in the pool');
    }

    onPlayerExitTrigger(player: hz.Player) {
        // Check if there are any objects in use
        const usedObject = Array.from(this.objects.entries()).find(([_, data]) => data.inUse);
        if (usedObject) {
            const [entity, data] = usedObject;

            // Mark the object as not in use
            data.inUse = false;

            this.objects.set(entity, data);

            // Move the object back to the pool position
            entity.position.set(this.poolPosition);
            entity.rotation.set(hz.Quaternion.zero);

            return;
        }
    }
}

hz.Component.register(UseObjectPool);