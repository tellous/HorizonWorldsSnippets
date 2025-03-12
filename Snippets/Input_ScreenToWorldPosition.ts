import * as hz from 'horizon/core';

// See World_OwnershipManagement to manage ownership 
// This script must be set to "Local" execution mode in the editor.
class ScreenToWorldPosition extends hz.Component<typeof ScreenToWorldPosition> {
    static propsDefinition = {
        ray: { type: hz.PropTypes.Entity },
    };

    private owner?: hz.Player;

    private serverPlayer?: hz.Player;

    //Be sure to add an object tag to the raycast gizmo properties in the editor
    private ray?: hz.RaycastGizmo;

    start() {
        this.owner = this.entity.owner.get();

        this.serverPlayer = this.world.getServerPlayer();

        this.ray = this.props.ray?.as(hz.RaycastGizmo);
        this.ray?.owner.set(this.owner);

        if (this.owner === this.serverPlayer) {
            // The entity is owned by the server player, so end the script
            return;
        }

        this.owner.enterFocusedInteractionMode();

        this.connectLocalBroadcastEvent(
            hz.PlayerControls.onFocusedInteractionInputStarted,
            this.onInteraction.bind(this)
        );
    }

    private onInteraction(data: { interactionInfo: hz.InteractionInfo[] }) {
        const firstInteraction = data.interactionInfo[0];

        if (!firstInteraction) {
            return;
        }

        const origin = firstInteraction.worldRayOrigin;
        const direction = firstInteraction.worldRayDirection;

        // Create a ray from the screen position
        const ray = this.ray?.raycast(origin, direction);

        if(ray){
            if (ray.targetType === hz.RaycastTargetType.Entity) {
                // The ray hit an entity
                console.log('Hit entity:', ray.target.name.get());
            } else if (ray.targetType === hz.RaycastTargetType.Player) {
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

hz.Component.register(ScreenToWorldPosition);