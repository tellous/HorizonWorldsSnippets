import { Component, PropTypes, WorldInventory, CodeBlockEvents, Entity, Player } from 'horizon/core';

class UseWorldInventory extends Component<typeof UseWorldInventory> {
    static propsDefinition= {
        earnTrigger: { type: PropTypes.Entity },
        consumeTrigger: { type: PropTypes.Entity }
    };

    //This trigger will grant an item to the player
    earnTrigger?: Entity;

    //This trigger will consume an item from the player
    consumeTrigger?: Entity;

    iwpId = 'myIwp'; // Replace with your actual In-World Purchase Item ID

    isEarning = false;

    isConsuming = false;

    preStart() {
        this.earnTrigger = this.props.earnTrigger;

        this.consumeTrigger = this.props.consumeTrigger;

        this.earnTrigger && this.connectCodeBlockEvent(this.earnTrigger, CodeBlockEvents.OnPlayerEnterTrigger, this.onEnterEarnTrigger.bind(this));

        this.consumeTrigger && this.connectCodeBlockEvent(this.consumeTrigger, CodeBlockEvents.OnPlayerEnterTrigger, this.onEnterConsumeTrigger.bind(this));
    }

    start() {
        // Intentionally left blank
    }

    onEnterEarnTrigger(player: Player) {
        // Check if the player is already in the process of earning an item
        if (this.isEarning) {
            console.log('Already processing an earn request. Please wait.');
            return;
        }

        this.isEarning = true;

        // Count how many items the player has in their inventory
        WorldInventory.getPlayerEntitlementQuantity(player, this.iwpId)
            .then((count) => {
                console.log(`Player had ${count} items in their inventory.`);
                
                // As an example, we will max out the player's inventory to 5 items
                if (count <= 5) {
                    // Add the item to the player's inventory
                    WorldInventory.grantItemToPlayer(player, this.iwpId);
                    console.log('Item granted to player inventory.');
                }
            })
            .catch((error) => {
                console.error('Error fetching player entitlement quantity:', error);
            })
            .finally(() => {
                this.isEarning = false;
            });
    }

    onEnterConsumeTrigger(player: Player) {
        // Check if the player is already in the process of consuming an item
        if (this.isConsuming) {
            console.log('Already processing a consume request. Please wait.');
            return;
        }

        this.isConsuming = true;

        // Check if the player has the item in their inventory
        WorldInventory.doesPlayerHaveEntitlement(player, this.iwpId)
            .then((hasItem) => {
                if (hasItem) {
                    // Remove the item from the player's inventory
                    WorldInventory.consumeItemForPlayer(player, this.iwpId);
                    console.log('Item consumed from player inventory.');
                } else {
                    console.log('Player does not have the item in their inventory.');
                }
            })
            .catch((error) => {
                console.error('Error checking player entitlement:', error);
            })
            .finally(() => {
                this.isConsuming = false;
            });
    }

}
Component.register(UseWorldInventory);