import * as hz from 'horizon/core';

class CustomAssetSpawner extends hz.Component<typeof CustomAssetSpawner> {
    static propsDefinition = {
        myAsset: { type: hz.PropTypes.Asset },
    };

    private spawnController?: hz.SpawnController;

    start() {
        const asset = this.props.myAsset;

        if (!asset) {
            console.error('No asset provided for spawning.');
            return;
        }

        this.spawnController = new hz.SpawnController(asset, hz.Vec3.zero, hz.Quaternion.zero, hz.Vec3.one);

        this.spawnController.spawn()
            .then((entity) => {
                console.log('Spawned entity:', entity);
            })
            .catch((error) => {
                console.error('Error spawning entity:', error);
            });
    }
}

hz.Component.register(CustomAssetSpawner);