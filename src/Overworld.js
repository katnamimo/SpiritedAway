class Overworld extends Phaser.Scene{
    constructor(){
        super({key:"overworldScene"});
        this.VEL=100
    }
    preload(){
        this.load.path='./assets/';
        this.load.spritesheet('slime','slime.png',{
            frameWidth: 16,
            frameHeight:16
        });
        this.load.image('tilesetImage','tileset.png');
        this.load.tilemapTiledJSON('tilemapJSON','area01.json');
    }
    create(){
        const map=this.add.tilemap('tilemapJSON');
        const tileset= map.addTilesetImage('tileset', 'tilesetImage');

        //add back
        const bgLayer=map.createLayer('Background',tileset,0,0);
        const terrainLayer=map.createLayer('Terrain',tileset,0,0);
        const treeLayer=map.createLayer('Trees',tileset,0,0).setDepth(10);

        //add sprite
        this.slime=this.physics.add.sprite(32,32,'slime',0);
        this.anims.create({
            key:'jiggle',
            frameRate:8,
            repeat:-1,
            frames: this.anims.generateFrameNumbers('slime',{
                start:0,
                end:1
            })
        });
        this.slime.play('jiggle');
        this.slime.body.setCollideWorldBounds(true)
        terrainLayer.setCollisionByProperty({collides:true});
        treeLayer.setCollisionByProperty({collides:true});
        this.physics.add.collider(this.slime,terrainLayer);
        this.physics.add.collider(this.slime,treeLayer);
        //cameras
        this.cameras.main.setBounds(0,0, map.widthInPixels,map.heightInPixels);
        this.cameras.main.startFollow(this.slime,true,0.25,0.25);
        this.physics.world.bounds.setTo(0,0,map.widthInPixels,map.heightInPixels);
        this.cursors=this.input.keyboard.createCursorKeys();

    }
    update(){
        this.direction=new Phaser.Math.Vector2(0);
        if(this.cursors.left.isDown){
            this.direction.x=-1;
        }
        else if(this.cursors.right.isDown){
            this.direction.x=1;
        }
        if(this.cursors.up.isDown){
            this.direction.y=-1;
        }
        else if(this.cursors.down.isDown){
            this.direction.y=1;
        }
        this.direction.normalize();
        this.slime.setVelocity(this.VEL*this.direction.x,this.VEL*this.direction.y);
    }
}