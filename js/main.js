var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('sky', 'assets/images/nightsky.jpg');
    game.load.image('ground', 'assets/images/platform.png');
    game.load.image('enemy', 'assets/images/enemy_box.png');
    // game.load.image('rainbow', 'assets/images/rainbow.png');
    game.load.spritesheet('unicorn', 'assets/images/dude.png', 32, 48);

}

var player;
var platforms;
var cursors;
var enemies = 40;
// var enemiesMax;
var coins;
var score = 0;
var scoreText;
var lives = 0;
var scoreLives;
var nightsky;
var gameTimer;
var timerMax;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0, 0, 'sky');
    nightsky = game.add.tileSprite(0, 0, 800, 600, 'sky');

    platforms = game.add.group();
    platforms.enableBody = true;
    var ground = platforms.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;

    player = game.add.sprite(32, game.world.height - 150, 'unicorn');
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.5;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;
    // player.scale.x = -1;
    // player.animations.add('wait', [3,4], 10);
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    enemies = game.add.sprite(0, 0, 'enemy');
    game.physics.arcade.enable(enemies);
    enemies.body.gravity.y = 60;

    // coins = game.add.sprite(0, 0,'rainbow');
    // game.physics.arcade.enable(coins);
    // coins.scale.setTo(0.1);
    // coins.body.gravity.y = 20;


    // coins.angle = game.rnd.angle();
    
    // for (var i = 0; i < 50; i++)
    // {
        // var enemies = enemies.create(game.rnd.integerInRange(0, game.world.width - 32), game.rnd.integerInRange(0, game.world.height - 32), 'enemy');   
        // enemies = game.add.sprite(0, 0, 'enemy');
        // game.physics.arcade.enable(enemies);
        // enemies.body.gravity.y = 50;

        //  Let gravity do its thing

        //  This just gives each star a slightly random bounce value

    
    gameTimer = 500;

    cursors = game.input.keyboard.createCursorKeys();
    scoreText = game.add.text(16, 16, 'score: 0', { font: '32px Arial', fill: '#fff' });
    lives = game.add.text(game.world.width - 150, 16, 'Lives : 3 ', { font: '32px Arial', fill: '#fff' });
    timer = game.add.text(game.world.width - 450, 16, 'Timer : ' + gameTimer, { font: '32px Arial', fill: '#fff' });

 }



function update() {

    nightsky.tilePosition.x += 2;
    gameTimer -= 1; 
    timer.setText('Timer: ' + gameTimer)   

    if (gameTimer === timerMax) {

        console.log('GameOver!')

    }

    player.body.velocity.x = 0;

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
        
    var collide = game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(enemies, coins);
    game.physics.arcade.overlap(player, enemies, lose, null, this);
    game.physics.arcade.overlap(player, coins, collectCoins, null, this);

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

function lose (player, enemies) {
    player.kill();
    enemies.kill();
    score -= 10;
    scoreText.setText('Score: ' + score + "Game Over!");
    console.log("Game Over !");
}

function collectCoins (player, coin) {
    coin.kill();
    lives += 1;
    scoreLives.setText('Lives: ' + lives);
}



