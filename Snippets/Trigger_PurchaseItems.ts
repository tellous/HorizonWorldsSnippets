import * as hz from 'horizon/core';
import { InWorldPurchase } from 'horizon/core'; // Import InWorldPurchase

class PurchaseItem extends hz.Component<typeof PurchaseItem> {
  sku = 'Test'; // SKU for the item to be purchased. Change to use your SKU.

  start() {
    // Connect to the player enter trigger event
    this.connectCodeBlockEvent(
      this.entity,
      hz.CodeBlockEvents.OnPlayerEnterTrigger,
      this.onPlayerEnter.bind(this)
    );

    // Connect to the purchase complete event
    this.connectCodeBlockEvent(
      this.entity, // Or use this.world if the event is global
      hz.CodeBlockEvents.OnItemPurchaseComplete,
      this.onPurchaseComplete.bind(this)
    );
  }

  // Handle the player entering the trigger
  private onPlayerEnter(player: hz.Player) {
    // Check if the SKU property is set
    if (this.sku && this.sku.length > 0) {
      // Launch the purchase flow for the player and the specified SKU
      InWorldPurchase.launchCheckoutFlow(player, this.sku);
      console.log(`Attempting purchase for SKU: ${this.sku} by player: ${player.name.get()}`);
    } else {
      console.error('PurchaseItem: SKU property is not set.');
    }
  }

  // Handle the purchase completion event
  private onPurchaseComplete(player: hz.Player, itemSku: string, success: boolean) {
    // Check if the completed purchase matches the SKU of this component
    if (itemSku === this.sku) {
      if (success) {
        console.log(`Purchase successful for SKU: ${itemSku} by player: ${player.name.get()}`);
        // Add any logic here for successful purchase (e.g., grant item, show message)
      } else {
        console.log(`Purchase failed for SKU: ${itemSku} by player: ${player.name.get()}`);
        // Add any logic here for failed purchase (e.g., show error message)
      }
    }
  }
}
hz.Component.register(PurchaseItem);