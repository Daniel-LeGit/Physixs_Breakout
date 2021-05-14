import {Paddle} from './paddle.js';
import {Ball} from './ball.js';

export class MainScene extends Phaser.Scene {
    
    constructor() {
        
        super('MainScene');
        
    }
    
    init(){
        
        this.bored = {
            
            width: 10,
            height: 10,
            tile_size: {
                
                width: 64,
                height: 32,
                
            },
            head_space:2,
            
        }
        
        this.bricks_count = 0;
        
    }
    preload(){}
    create(){
        /*
        let paddle_s = this.add.sprite(
        
            this.game.config.width * 0.5,
            this.game.config.height - 20,
            'paddle'
        
        )
        
        this.paddle = this.physics.add.existing(paddle_s);
        this.paddle.body.allowGravity = false;
        */
        
        this.bricks = this.physics.add.staticGroup();
        
        this.createMap();
        
        this.paddle = new Paddle(
        
            this.game.config.width * 0.5,
            this.game.config.height - 20,
            'paddle'
        
        )
        
        this.ball = new Ball(
        
            this.game.config.width * 0.5,
            this.game.config.height - 20,
            'ball'
        
        )
        
        this.paddle.setBall(this.ball);
        
    }
    update(time){
        
        this.paddle.update(time);
        
        
    }
    
    lunchables(){
        
        this.ball.lunch();
        this.physics.add.collider(this.paddle, this.ball);
        this.physics.add.collider(this.ball, this.bricks, this.onCollision(), null, this);
        
    }
    
    createMap(){
        
        let start_y = this.bored.tile_size.height * this.bored.head_space;
        let start_x = (this.game.config.width*0.5) - (this.bored.width * this.bored.tile_size.width)* 0.5;
        
        let textures =  ['el_Y', 'el_R', 'el_G', 'el_B', 'el_P'];
        
        for(let w = 0; w < this.bored.width; ++w){
            for(let w = 0; w < this.bored.width; ++w){
                
                let hit_count = Phaser.Math.Between(1, 5);
                
            let brick =  new Brick (this, start_x + w * this.bored.tile_size.width, start_y + h * this.bored.tile_size.height, textures[hit_count-1], hit_count);
            }
            this.bricks.add(brick);
            this.bricks_count = this.bricks_count + 1;
        }
        
    }
    
    onCollision(ball, brick){
        
        brick.hit();
        this.bricks_count--;
        if(this.bricks_count <= 0){
            
            this.scene.restart();
            
        }
        
    }
    
    decreaseBrickCount(){
        
        brick.hit();
        this.bricks_count--;
        if(this.bricks_count <= 0){
            
            this.scene.restart();
            
        }
    
}