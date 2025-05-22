import { Component, PropTypes, RaycastGizmo, PlayerControls, RaycastTargetType, Player, InteractionInfo } from 'horizon/core';

// See World_OwnershipManagement to manage ownership 
// This script must be set to "Local" execution mode in the editor.
class ScreenToWorldPosition extends Component<typeof ScreenToWorldPosition> {
    static propsDefinition = {
        ray: { type: PropTypes.Entity },
    };

    private owner?: Player;

    private serverPlayer?: Player;

    //Be sure to add an object tag to the raycast gizmo properties in the editor
    private ray?: RaycastGizmo;

    preStart() {
        this.owner = this.entity.owner.get();

        this.serverPlayer = this.world.getServerPlayer();

        this.ray = this.props.ray?.as(RaycastGizmo);
        this.ray?.owner.set(this.owner);

        if (this.owner === this.serverPlayer) {
            // The entity is owned by the server player, so end the script
            return;
        }

        this.owner.enterFocusedInteractionMode();

        this.connectLocalBroadcastEvent(
            PlayerControls.onFocusedInteractionInputStarted,
            this.onInteraction.bind(this)
        );
    }

    start() {}

    private onInteraction(data: { interactionInfo: InteractionInfo[] }) {
        const firstInteraction = data.interactionInfo[0];

        if (!firstInteraction) {
            return;
        }

        const origin = firstInteraction.worldRayOrigin;
        const direction = firstInteraction.worldRayDirection;

        // Create a ray from the screen position
        const ray = this.ray?.raycast(origin, direction);

        if(ray){
            if (ray.targetType === RaycastTargetType.Entity) {
                // The ray hit an entity
                console.log('Hit entity:', ray.target.name.get());
            } else if (ray.targetType === RaycastTargetType.Player) {
                // The ray hit a player
                console.log('Hit player:', ray.target.name.get());
            } else{
                // The ray hit the world
                console.log('Hit world');
            }

            console.log('Ray hit position:', ray.hitPoint);
        }
    }
}

Component.register(ScreenToWorldPosition);