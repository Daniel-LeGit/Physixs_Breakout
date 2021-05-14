export class Paddle extends Phaser.Physics.Arcade.Scene {
    
    constructor(scene, x, y, texture) {
        
        super(scene, x, y, texture);
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.body.allowGravity = false;
        this.setColliderWorldBounds(true);
        
        this.setImovable(true);
        
        this.ball = undefined;
        this.ball_launched = false;
        
        this.controls = scene.input.keyboard.createCursorKeys();
        
        this.velocity = 250;
        
    }
    
    update(time){
        
        if(this.controls.left.isDown){
            
            this.setVelocityX(-this.velocity);
            
        }
        else if(this.controls.right.isDown){
            
            this.setVelocityX(this.velocity);
            
        }
        else{
            
            this.setVelocityX(0);
            
        }
        
        if(this.ball && !this.ball_launched){
            
            this.ball.setPosition(this.x, this.y - this.displayHeight);
            
        }
        
        if(!this.ball_launched && this.controls.space.isDown){
            
            this.ball_launched = true;
            this.ball.lunch();
            
        }
        
        
        
    }
    
    setBall(ball){
        
        this.ball = ball;
        
    }
    
}