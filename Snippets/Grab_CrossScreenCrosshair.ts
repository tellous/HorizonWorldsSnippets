import * as hz from 'horizon/core';
import LocalCamera from 'horizon/camera';

// See World_OwnershipManagement to manage ownership 
// This script must be set to "Local" execution mode in the editor.
class CrossScreenCrosshair extends hz.Component<typeof CrossScreenCrosshair> {
    static propsDefinition = {
        ray: { type: hz.PropTypes.Entity },
        crosshair: { type: hz.PropTypes.Entity }
    };

    private owner?: hz.Player;

    private serverPlayer?: hz.Player;

    private ray?: hz.RaycastGizmo;

    private crosshair?: hz.Entity;

    private isGrabbed = false;

    private maxDistance = 20; // Adjust maxDistance as needed

    start() {
        this.owner = this.entity.owner.get();

        this.serverPlayer = this.world.getServerPlayer();

        this.ray = this.props.ray?.as(hz.RaycastGizmo);
        this.ray?.owner.set(this.entity.owner.get());

        this.crosshair = this.props.crosshair;
        this.crosshair?.owner.set(this.entity.owner.get());

        if (this.owner === this.serverPlayer) {
            // The entity is owned by the server player, so end the script
            return;
        }

        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnGrabStart,
            this.onGrab.bind(this)
        );

        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnGrabEnd,
            this.onRelease.bind(this)
        );

        this.connectLocalBroadcastEvent(
            hz.World.onUpdate,
            this.onUpdate.bind(this)
        );
    }

    onGrab(isRightHand: boolean, player: hz.Player) {
        this.isGrabbed = true;
        this.crosshair?.setVisibilityForPlayers([player], hz.PlayerVisibilityMode.VisibleTo);
    }

    onRelease(player: hz.Player) {
        this.isGrabbed = false;
        this.crosshair?.setVisibilityForPlayers([], hz.PlayerVisibilityMode.VisibleTo);
    }

    onUpdate() {
        if (this.isGrabbed) {
            const origin = LocalCamera.position.get();
            const direction = LocalCamera.forward.get();
            const rayData = this.ray?.raycast(origin, direction, { maxDistance: this.maxDistance });

            if (rayData) {
                this.crosshair?.position.set(rayData.hitPoint);
                this.crosshair?.rotation.set(hz.Quaternion.lookRotation(rayData.normal, hz.Vec3.up));
            } else {
                this.crosshair?.position.set(origin.add(direction.mul(this.maxDistance)));
                this.crosshair?.rotation.set(hz.Quaternion.zero);
            }
        }
    }
}

hz.Component.register(CrossScreenCrosshair);