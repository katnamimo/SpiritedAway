class Overworld extends Phaser.Scene {
  constructor() {
    super('Overworld');
  }

  preload() {
    this.load.tilemapTiledJSON('map', 'assets/tilemap.json');
    this.load.image('background', 'assets/background.png');
    this.load.image('tiles', 'assets/tiles.png');
    this.load.spritesheet('player', 'assets/player.png', { frameWidth: 190, frameHeight: 170 });
  }

  create() {
    const backgroundImage = this.add.image(0, 0,'background').setOrigin(0, 0);
    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('spiritedaway', 'tiles');
    const groundLayer = map.createStaticLayer('Ground', tileset, 0, 0);
    groundLayer.setCollisionByExclusion([-1]);

    this.player = this.physics.add.sprite(150, 130, 'player');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    this.physics.add.collider(this.player, groundLayer);

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setZoom(2);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 2 }),
      frameRate: 5,
      repeat: -1
    });
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', { start: 3, end: 5 }),
      frameRate: 10,
      repeat: -1
    });

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play('right', true);
    } 
    if (this.cursors.up.isDown && this.player.body.onFloor()) {
      this.player.setVelocityY(-330);
    }
  }
}

