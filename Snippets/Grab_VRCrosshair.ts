import { Component, PropTypes, Vec3, Quaternion, Player, RaycastGizmo, CodeBlockEvents, World, PlayerVisibilityMode, Entity } from 'horizon/core';

// See World_OwnershipManagement to manage ownership 
// This script must be set to "Local" execution mode in the editor.
class VRCrosshair extends Component<typeof VRCrosshair> {
    static propsDefinition = {
        ray: { type: PropTypes.Entity },
        crosshair: { type: PropTypes.Entity }
    };

    private owner?: Player;

    private serverPlayer?: Player;

    private ray?: RaycastGizmo;

    private crosshair?: Entity;

    private isGrabbed = false;

    private maxDistance = 20; // Adjust maxDistance as needed

    preStart() {
        this.owner = this.entity.owner.get();

        this.serverPlayer = this.world.getServerPlayer();

        this.ray = this.props.ray?.as(RaycastGizmo);
        this.ray?.owner.set(this.entity.owner.get());

        this.crosshair = this.props.crosshair;
        this.crosshair?.owner.set(this.entity.owner.get());

        if (this.owner === this.serverPlayer) {
            // The entity is owned by the server player, so end the script
            return;
        }

        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnGrabStart,
            this.onGrab.bind(this)
        );

        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnGrabEnd,
            this.onRelease.bind(this)
        );

        this.connectLocalBroadcastEvent(
            World.onUpdate,
            this.onUpdate.bind(this)
        );
    }

    start() {}

    onGrab(isRightHand: boolean, player: Player) {
        this.isGrabbed = true;
        this.crosshair?.setVisibilityForPlayers([player], PlayerVisibilityMode.VisibleTo);
    }

    onRelease(player: Player) {
        this.isGrabbed = false;
        this.crosshair?.setVisibilityForPlayers([], PlayerVisibilityMode.VisibleTo);
    }

    onUpdate() {
        if (this.isGrabbed) {
            const origin = this.ray?.position.get() ?? Vec3.zero;
            const direction = this.ray?.forward.get() ?? Vec3.forward;
            const rayData = this.ray?.raycast(origin, direction, { maxDistance: this.maxDistance });

            if (rayData) {
                this.crosshair?.position.set(rayData.hitPoint);
                this.crosshair?.rotation.set(Quaternion.lookRotation(rayData.normal, Vec3.up));
            } else {
                this.crosshair?.position.set(origin.add(direction.mul(this.maxDistance)));
                this.crosshair?.rotation.set(Quaternion.zero);
            }
        }
    }
}

Component.register(VRCrosshair);