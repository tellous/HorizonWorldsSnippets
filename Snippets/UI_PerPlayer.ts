import { CodeBlockEvents, Component } from 'horizon/core';
import { UIComponent, View, Text, Binding } from 'horizon/ui';

const textBinding = new Binding('')

class PerPlayer extends UIComponent<typeof PerPlayer> {
    preStart() { }
    start() { }

    public initializeUI() {
        return View({
            children: [
                Text({
                    text: textBinding.derive((text) => {
                        return `Hello ${text}!`;
                    }),
                })
            ],
            style: {
                flex: 1
            }
        });
    }
}
UIComponent.register(PerPlayer);

// Place this component on a Trigger Gizmo
class PlayerTrigger extends Component<typeof PlayerTrigger> {
    preStart() {
        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnPlayerEnterTrigger,
            (player) => {
                // Only update the text binding for the player that entered the trigger
                textBinding.set(player.name.get(), [player]);
            }
        )
    }

    start() { }
}
Component.register(PlayerTrigger);