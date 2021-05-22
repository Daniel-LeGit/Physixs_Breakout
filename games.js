import {MainScene} from './mainscene.js';
import LoadScene from './loadscene.js';

const config = {
    
    width: 800,
    height: 600,
    type: Phaser.AUTO, 
    parent: 'gamestop',
    backgroundColor: '#286484',
    scene:[LoadScene, MainScene],
    physics: {
        
        default: 'arcade',
        arcade: {
            
            gravity: { y: 250 },
            debug: false
            
        }
        
    }
    
    
}

new Phaser.Game(config);