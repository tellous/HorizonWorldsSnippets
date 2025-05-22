import { Component, CodeBlockEvents, Player } from 'horizon/core';

class PlayerDetectionZone extends Component<typeof PlayerDetectionZone> {
    private playersInZone: Player[] = [];
    
    preStart() {
        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnPlayerEnterTrigger,
            this.onPlayerEnter.bind(this)
        );
        
        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnPlayerExitTrigger,
            this.onPlayerExit.bind(this)
        );
    }
    
    start() {
        // Intentionally left blank
    }
    
    private onPlayerEnter(player: Player) {
        this.playersInZone.push(player);
        console.log(`Players in zone: ${this.playersInZone.length}`);
    }
    
    private onPlayerExit(player: Player) {
        this.playersInZone = this.playersInZone.filter(p => p.id !== player.id);
        console.log(`Players in zone: ${this.playersInZone.length}`);
    }
}

Component.register(PlayerDetectionZone);