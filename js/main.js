var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('sky', 'assets/images/nightsky.jpg');
    game.load.image('ground', 'assets/images/platform.png');
    game.load.image('enemy', 'assets/images/enemy_box.png');
    game.load.image('rainbow', 'assets/images/rainbow.png');
    game.load.spritesheet('unicorn', 'assets/images/dude.png', 32, 48);

}

var player;
var platforms;
var cursors;
var enemies;
// var enemiesMax;
var coins;
var score = 0;
var scoreText;
var lives = 0;
var scoreLives;
var nightsky;
var gameTimer;
var maxEnemies = 15;
var enemy;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    game.stage.backgroundColor = 'black';
    //backgorund sky
    game.add.sprite(0, 0, 'sky');
    nightsky = game.add.tileSprite(0, 0, 800, 600, 'sky');
    //create platform
    platforms = game.add.group();
    platforms.enableBody = true;
    var ground = platforms.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;
    //create player
    player = game.add.sprite(32, game.world.height - 150, 'unicorn');
    game.physics.arcade.enable(player);
    player.body.bounce.y = 1;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;
    //player animations
    player.animations.add('wait', [3,4], 10);
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
    //create enemies
    enemies = game.add.group();
    enemies.enableBody = true;
    game.physics.arcade.enable(enemies);
    game.physics.arcade.collide(enemies);

    //random player falling
    
    spawEnemy();

    console.log(enemy);

    gameTimer = 500;
    cursors = game.input.keyboard.createCursorKeys();
    scoreText = game.add.text(16, 16, 'score: 0', { font: '32px Arial', fill: '#fff' });
    lives = game.add.text(game.world.width - 150, 16, 'Lives : 3 ', { font: '32px Arial', fill: '#fff' });
    timer = game.add.text(game.world.width - 450, 16, 'Timer : ' + gameTimer, { font: '32px Arial', fill: '#fff' });

    gameOver();
 }

function spawEnemy () {
    for (var i = 12; i > 0; i--) {
        enemy = enemies.create(Math.random()*game.world.width, 0, 'enemy');
        enemy.body.gravity.y = game.rnd.integerInRange(50, 100);
        enemy.checkWorldBounds = true;
        enemy.outOfBoundsKill = true;
    }
}

function checkEnemy () {
    // enemies.children.forEach((enemy, i) => {
    //    if(enemy.destroy();
    // })
}

function gameOver() {
    scoreText = game.add.text(16, 16, 'score: 0', 
    { font: '32px Arial', fill: '#fff'});
    // game.stage.backgroundColor = '#992d2d';

}

function update() {

    console.log(enemies.children.length);

    enemies.children.forEach((enemy, i) => {
        if(!enemy.inWorld) {
            enemy.destroy()
        }
    })

    if (enemies.children.length < 1) {
        spawEnemy()
    }

    gameOver();
    //background img scroll
    nightsky.tilePosition.x += 2;

    //counting down timer
    gameTimer -= 1; 
    timer.setText('Timer: ' + gameTimer)   

    //adding rotation to enemies
    enemies.children.forEach(val => {
        val.rotation+=Math.random()*0.2;
    })


    if (gameTimer <=0 ) {
        gameOver();
    }

    player.body.velocity.x = 0;

    //make the player move 
    if (cursors.left.isDown)
    {
        player.body.velocity.x = -100;
        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 100;
        player.animations.play('right');
    }
    else {
    player.animations.stop();
    player.frame = 4;

    }
        
    //collision between groups 
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(enemies);
    game.physics.arcade.collide(enemies, coins);
    game.physics.arcade.overlap(player, enemies, lose, null, this);
    game.physics.arcade.overlap(player, coins, collectCoins, null, this);

    //change velocity and amount of enemies as time decreases
    if (timer <=90000 && timer >= 60000) {
        enemiesMax = 20;
            enemies.body.velocity.y +=10;
            coins.body.velocity.y +=10;

    }
    else if (timer <=60000 && timer >=30000) {
        enemiesMx = 15;
            enemies.body.velocity.y +=10;
            coins.body.velocity.y +=10;
    }
    else if (timer <=30000 && timer >0) {
        enemiesMax = 10; 
    }

}

    //collsion between player and enemies
function lose (player, enemies) {
    player.kill();
    enemies.kill();
    score -= 10;
    gameOver();
}

//collision between player and coins
function collectCoins (player, coin) {
    coin.kill();
    lives += 1;
    scoreLives.setText('Lives: ' + lives);
}



