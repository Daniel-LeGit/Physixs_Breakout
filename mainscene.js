import {Paddle} from './paddle.js'
import {Ball} from './ball.js'
import {Brick} from './brick.js'

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
            head_space:2
            
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
            this,
            this.game.config.width * 0.5,
            this.game.config.height - 20,
            'paddle'
        
        )
        
        this.ball = new Ball(
            this,
            this.game.config.width * 0.5,
            this.game.config.height - 20,
            'ball'
        
        )

       
        this.paddle.setBall(this.ball);

        this.num_balls = 3;
        this.score = 0;

        this.scoreText=
        this.add.text( 10, 10,`Score: ${this.score}`,{
            
            fontFamily: 'Arial', 
            fontSize: 24,
            color: '#fff', 
            align: 'center'
            
        }).setOrigin(0,0);

        this.ballsText=
        this.add.text( this.game.config.width-130, 10,`${this.num_balls} balls left`,{
            
            fontFamily: 'Arial', 
            fontSize: 24,
            color: '#fff', 
            align: 'center'
            
        }).setOrigin(0,0);
        

    }
    
    update(time){
        
        if (this.ball.y>this.paddle.y) {
            this.num_balls = this.num_balls - 1;
            this.paddle.ball_launched = false;
            this.ballsText.text = `${this.num_balls} balls left`;

            if (this.num_balls<=0) {
                this.ball.disableBody(true, true);
                this.paddle.disableBody(true, true);
                this.scoreText.text = `GAME OVER - Final Score: ${this.score}`;
            }
        }

        this.paddle.update(time);
        
    }
    
    lunchables(){
        
        this.ball.lunch();
        this.physics.add.collider(this.paddle, this.ball);
        this.physics.add.collider(this.ball, this.bricks, this.onCollision, null, this);
        
    }
    
    createMap(){
        
        let start_y = this.bored.tile_size.height * this.bored.head_space;
        let start_x = (this.game.config.width*0.5) - (this.bored.width * this.bored.tile_size.width)* 0.5;
        
        let textures =  ['el_Y', 'el_R', 'el_G', 'el_B', 'el_P'];
        
        for(let w = 0; w < this.bored.width; ++w){
            for(let h = 0; h < this.bored.width; ++h){
                
                let hit_count = Phaser.Math.Between(1, 5);
                
                let brick =  new Brick (this, start_x + w * this.bored.tile_size.width, start_y + h * this.bored.tile_size.height, textures[hit_count-1], hit_count);
                this.bricks.add(brick);
                this.bricks_count = this.bricks_count + 1;
            }
        }
        
    }
    
    onCollision(ball, brick){
        
        brick.hit();
       
    }
    
    decreaseBrickCount(){
        
        //brick.hit();
        this.score = this.score + 100;
        this.scoreText.text = `Score: ${this.score}`; 

        this.bricks_count--;
        if(this.bricks_count <= 0){
            
            //this.scene.restart();
            this.paddle.ball_launched = false;
            this.createMap();
            
        }
    }
    
}