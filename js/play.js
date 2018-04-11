var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('sky', 'assets/images/nightsky.jpg');
    game.load.image('ground', 'assets/images/platform.png');
    game.load.image('enemy', 'assets/images/enemy_box.png');
    game.load.image('rainbow', 'assets/images/emitter.png');
    game.load.spritesheet('unicorn', 'assets/images/dude.png', 32, 48);
    game.load.image('winstate', 'assets/images/unicornbox.png');
}

//global variables
var rainbow;
var player;
var platforms;
var cursors;
var enemies;
var coins;
var coin;
var score = 0;
var scoreText;
var nightsky;
var gameTimer = 20;
var enemiesMax = 5;
var enemy;
var timer;
var endTimer;
var minSpeed = 50;
var maxSpeed = 100;
var lose;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    //background sky
    game.add.sprite(0, 0, 'sky');
    nightsky = game.add.tileSprite(0, 0, 800, 600, 'sky');
    //create platform
    platforms = game.add.group();
    platforms.enableBody = true;
    var ground = platforms.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;
    //create player
    player = game.add.sprite(400, game.world.height - 150, 'unicorn');
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
    spawnEnemy();
        // The enemy's bullets
    rainbow = game.add.group();
    rainbow.enableBody = true;
    game.physics.arcade.enable(rainbow);



    Phaser.Particles.Arcade.Emitter.prototype.makeParticles = function () {

        frames = 0;
        quantity = this.maxParticles;
        collide = false;
        collideWorldBounds = false;
        particleArguments = null; 
    }

 





    cursors = game.input.keyboard.createCursorKeys();
    scoreText = game.add.text(16, 16, 'Score: 0', { font: '32px Arial', fill: '#fff' });
    timer = game.add.text(650, 16, 'Timer : ' + gameTimer, { font: '32px Arial', fill: '#fff' });

    // create setInterval and clearInterval outside of states
}
        var endTimer = setInterval(function() {
        gameTimer -= 1;
        timer.setText('Timer: ' + gameTimer)   
        console.log('time');

        if(gameTimer <= 0) {
            console.log('over')
            clearInterval(endTimer);
            win ();
        }
    }, 1000);

function spawnEnemy () {
    for (var i = 0; i < enemiesMax; i++) {
        enemy = enemies.create(Math.random()*game.world.width, 0, 'enemy');
        enemy.body.gravity.y = game.rnd.integerInRange(minSpeed, maxSpeed);
        enemy.body.bounce.set(0.8);
        enemy.anchor.setTo(0.5);
        enemy.collideWorldBounds = true;
        enemy.checkWorldBounds = true;
        enemy.outOfBoundsKill = true;
    }
} 

function gameOver() {
    scoreText = game.add.text(game.world.centerX-200, game.world.centerY-100, 'GAME OVER!', { font: '60px Arial', fill: '#fff'});
    nightsky.tint = "0x992D2D";
    clearInterval(endTimer);
    game.paused = true;
    console.log('gameover');
    game.time.events.add(1000, () => {
        game.add.sprite(0, 0, 'sky');
        console.log('hey');
    },this);
}
//win function 
function win () {
    scoreText = game.add.text(300, game.world.centerY-100, 'You Won!', { font: '60px Arial', fill: 'white'});
    game.time.events.add(3000, () => {
    game.add.sprite(0, 0, 'winstate');
    game.paused = true;
    console.log('hey');
    },this);
}


//if player doesnt collide call win function
function update () {

   //background img scroll
    nightsky.tilePosition.x += 2;



    // kill the enemy if it's out of the world
    enemies.children.forEach((enemy, i) => {
        if(!enemy.inWorld) {
            enemy.destroy()
            console.log('test2');
        }
    })

    // spawn enemy if the array of enemy is less than 1 
    if (enemies.children.length < 1) {
        spawnEnemy()
    }

    //adding rotation to enemies
    enemies.children.forEach(val => {
        val.rotation+=Math.random()*0.2;
    })

    player.body.velocity.x = 0;

    //make the player move 

    if (cursors.left.isDown) {
        player.body.velocity.x = -180;
        player.animations.play('left');
    }
    else if (cursors.right.isDown) {
        player.body.velocity.x = 180;
        player.animations.play('right');
    }
    else {
    player.animations.stop();
    player.frame = 4;
    }
        
    //collision between groups 
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(enemies, enemies);
    game.physics.arcade.collide(enemies, coins);
    game.physics.arcade.overlap(player, enemies, checkCollision, null, this);
    game.physics.arcade.overlap(player, rainbow, collectRainbow, null, this);

    //change velocity and amount of enemies as time decreases
    if (timer <=50 && timer >= 48) {
        minSpeed += 5;
        maxSpeed += 5;
    }
    else if (timer <=30 && timer >=28) {
        enemiesMax -= 4;
        minSpeed += 8;
        maxSpeed += 8;
    }
    else if (timer <=20 && timer >= 18) {
        enemiesMax -= 7; 
        minSpeed += 10;
        maxSpeed += 10;
    }
}

///////////////////////////END UPDATE////////////////////////////////////////////////

//random enemies falling function
 


//create gameOver function outside of states

//collsion between player and enemies
function checkCollision (player, enemies) {
    player.kill() 
    enemies.kill() 
    score -= 10;
    gameOver();
}

// collision between player and coins
function collectRainbow (player, rainbow) {
    rainbow.kill();
    player.body.velocity.x +=100;
    console.log('here');
    score +=10
scoreText.text = 'Score: ' + score;
}