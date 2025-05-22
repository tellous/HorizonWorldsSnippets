import { Component, PropTypes, SpawnController, Vec3, Quaternion, Asset, Entity } from 'horizon/core';

class CustomAssetSpawner extends Component<typeof CustomAssetSpawner> {
    static propsDefinition = {
        myAsset: { type: PropTypes.Asset },
    };

    private spawnController?: SpawnController;

    preStart() {
        const asset = this.props.myAsset;
        if (!asset) {
            console.error('No asset provided for spawning.');
            return;
        }
        this.spawnController = new SpawnController(asset, Vec3.zero, Quaternion.zero, Vec3.one);
        this.spawnController.spawn()
            .then(() => {
                // Access spawned entities via this.spawnController.rootEntities.get()
                const entities = this.spawnController?.rootEntities.get();
                console.log('Spawned entities:', entities);
            })
            .catch((error: unknown) => {
                console.error('Error spawning entity:', error);
            });
    }

    start() {}
}

Component.register(CustomAssetSpawner);