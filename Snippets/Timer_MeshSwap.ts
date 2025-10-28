import { Component, Asset, MeshEntity } from 'horizon/core';

class Timer_MeshSwap extends Component<typeof Timer_MeshSwap> {
  static propsDefinition = {};

  asset1 = new Asset(BigInt("ASSET_ID_1"))  // Replace ASSET_ID_1 with the actual asset ID

  asset2 = new Asset(BigInt("ASSET_ID_2"))  // Replace ASSET_ID_2 with the actual asset ID

  toggle = false;

  start() {
    this.async.setInterval(() => {
      this.toggle = !this.toggle;
      if (this.toggle) {
        this.entity.as(MeshEntity).setMesh(this.asset1, {});
      } else {
        this.entity.as(MeshEntity).setMesh(this.asset2, {});
      }
    }, 1000);
  }
}
Component.register(Timer_MeshSwap);