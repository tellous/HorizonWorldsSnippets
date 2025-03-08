import * as hz from 'horizon/core';

class PlayerDetectionZone extends hz.Component<typeof PlayerDetectionZone> {
    private playersInZone: hz.Player[] = [];
    
    start() {
        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnPlayerEnterTrigger,
            this.onPlayerEnter.bind(this)
        );
        
        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnPlayerExitTrigger,
            this.onPlayerExit.bind(this)
        );
    }
    
    private onPlayerEnter(player: hz.Player) {
        this.playersInZone.push(player);
        console.log(`Players in zone: ${this.playersInZone.length}`);
    }
    
    private onPlayerExit(player: hz.Player) {
        this.playersInZone = this.playersInZone.filter(p => p.id !== player.id);
        console.log(`Players in zone: ${this.playersInZone.length}`);
    }
}

hz.Component.register(PlayerDetectionZone);