import { Component, Vec3, Quaternion, CodeBlockEvents, Player } from 'horizon/core';
import LocalCamera from 'horizon/camera';

type CameraData = {
  position: Vec3;
  rotation: Quaternion;
  duration: number;
};

// See World_OwnershipManagement to manage ownership 
// This script must be set to "Local" execution mode in the editor.
class PlayCameraSequence extends Component<typeof PlayCameraSequence> {
  private owner?: Player;

  private serverPlayer?: Player;

  private sequence: CameraData[] = [];

  preStart() {
    // The player will own the entity when it is grabbed
    this.owner = this.entity.owner.get();

    this.serverPlayer = this.world.getServerPlayer();

    // Check if the entity is owned by a player
    if (this.owner === this.serverPlayer) {
      // The entity is owned by the server player, so end the script
      return;
    }

    //Load up sequence
    this.sequence = [];
    this.sequence.push({
      position: this.entity.position.get().add(this.entity.forward.get().mul(2)),
      rotation: Quaternion.lookRotation(this.entity.forward.get().mul(-1), Vec3.up),
      duration: 2
    });
    this.sequence.push({
      position: this.entity.position.get().add(this.entity.up.get().mul(4)),
      rotation: Quaternion.lookRotation(Vec3.down, Vec3.up),
      duration: 2
    });

    this.connectCodeBlockEvent(this.entity, CodeBlockEvents.OnPlayerEnterTrigger, this.onPlayerEnterTrigger.bind(this));
  }

  start() {
    // Intentionally left blank
  }

  private onPlayerEnterTrigger() {
    this.playNextCamera();
  }

  private playNextCamera() {
    const cameraData = this.sequence.shift();

    if (cameraData) {
      LocalCamera.setCameraModeFixed({
        position: cameraData.position,
        rotation: cameraData.rotation,
        duration: cameraData.duration
      });

      this.async.setTimeout(() => {
        this.playNextCamera();
      }, cameraData.duration * 1000);
    } else {
      this.async.setTimeout(() => {
        // Reset the camera mode to default
        LocalCamera.setCameraModeThirdPerson();
      }, 1000);
    }
  }
}
Component.register(PlayCameraSequence);