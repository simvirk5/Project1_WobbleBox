

var play  = {


preload: function () {

    game.load.image('sky', 'assets/images/nightsky.jpg');
    game.load.image('ground', 'assets/images/platform.png');
    game.load.image('enemy', 'assets/images/enemy_box.png');
    game.load.image('rainbow', 'assets/images/emitter.png');
    game.load.image('unicorn', 'assets/images/unicorn.png');
    game.load.image('winstate', 'assets/images/unicornbox.png');
},



create: function () {

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
    player.animations.add('left', true);
    player.animations.add('right', true);
    //create enemies
    enemies = game.add.group();
    enemies.enableBody = true;
    game.physics.arcade.enable(enemies);
    game.physics.arcade.collide(enemies);
    spawnEnemy();
    // create rainbows
    rainbows = game.add.group();
    rainbows.enableBody = true;
    game.physics.arcade.enable(rainbows);
    getRainbows();

    cursors = game.input.keyboard.createCursorKeys();
    scoreText = game.add.text(16, 16, 'Score: 0', { font: '32px Arial', fill: '#fff' });
    timer = game.add.text(650, 16, 'Timer : ' + gameTimer, { font: '32px Arial', fill: '#fff' });

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
},

update: function () {
    // kill the enemy if it's out of the world
    getRainbows();
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
    }
    else if (cursors.right.isDown) {
        player.body.velocity.x = 180;
    }
    else {
    player.animations.stop();
    }  
    //collision between groups 
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(enemies, enemies);
    game.physics.arcade.collide(enemies, coins);
    game.physics.arcade.overlap(player, enemies, checkCollision, null, this);
    game.physics.arcade.overlap(player, rainbows, collectRainbow, null, this);
    //change velocity and amount of enemies as time decreases
    if (timer <=40 && timer >= 30) {
        minSpeed += 5;
        maxSpeed += 5;
    }
    else if (timer <=29 && timer >=20) {
        enemiesMax -= 4;
        minSpeed += 10;
        maxSpeed += 10;
    }
    else if (timer <=19 && timer >= 10) {
        enemiesMax -= 7; 
        minSpeed += 15;
        maxSpeed += 15;
    }
}

}
///////////////////////////END UPDATE////////////////////////////////////////////////

function getRainbows () {
    for (var i = 0; i < rainbows; i++) {
        rainbow = rainbows.create(100, 0, 'rainbow');
        rainbow.body.gravity.y = game.rnd.integerInRange(minSpeed, maxSpeed);
    }
} 
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
function win () {
    scoreText = game.add.text(300, game.world.centerY-100, 'You Won!', { font: '60px Arial', fill: 'white'});
    nightsky.tint = "0x992D2D";
    game.time.events.add(3000, () => {
    game.add.sprite(100, 0, 'winstate');
    game.paused = true;
    console.log('hey');
    },this);
}
//collsion between player and enemies
function checkCollision (player, enemies) {
    player.kill() 
    enemies.kill() 
    score -= 10;
    scoreText.text = 'Score: ' + score;
    gameOver();
}
// collision between player and coins
function collectRainbow (player, rainbow) {
    rainbows.kill();
    // player.body.velocity.x +=100;
    console.log('here');
    score +=10
    scoreText.text = 'Score: ' + score;
}