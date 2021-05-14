import {MainScene} from './mainscene.js';
import LoadScene from './loadscene.js';

const config = {
    
    width: 750,
    height: 500,
    type: Phaser.AUTO, 
    parent: 'gamestop',
    backgroundColor: '#286484',
    scene:[LoadScene, MainScene],
    physics: {
        
        default: 'arcade',
        arcade: {
            
            gravity: { y: 150 },
            debug: false
            
        }
        
    }
    
    
}

new Phaser.Game(config);