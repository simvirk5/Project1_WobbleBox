var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('sky', 'assets/images/nightsky.jpg');
    game.load.image('ground', 'assets/images/platform.png');
    game.load.image('enemy', 'assets/images/enemy_box.png');
    game.load.spritesheet('unicorn', 'assets/images/dude.png', 32, 48);

}

var player;
var platforms;
var cursors;

var enemies;
var score = 0;
var scoreText;
var timer;
var lives;
var nightsky;

function create() {

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    game.add.sprite(0, 0, 'sky');
    nightsky = game.add.tileSprite(0, 0, 800, 600, 'sky');


    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 64, 'ground');


    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    // The player and its settings
    player = game.add.sprite(32, game.world.height - 150, 'unicorn');
    // sprite.anchor.setTo(0.5, 0.5);

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 1;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;
    // player.scale.x = -1;

    // player.animations.add('wait', [3,4], 10);


    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    //  Finally some stars to collect
    enemies = game.add.group();
    enemies.enableBody = true;
    enemies.setAll('outOfBoundsKill', true);
    enemies.setAll('checkWorldBounds', true);
    

    //  Here we'll create 12 of them evenly spaced apart
    for (var i = 0; i < 50; i++)
    {
        //  Create a star inside of the 'stars' group

        // var enemy = enemies.create((Math.random()*300), i*(Math.random()*60), 'enemy' + Math.round(Math.random() * 1));        
            
                 // var enemy = enemies.create(i*(Math.random()*60), i*(Math.random()*100), 'enemy');

                var enemy = enemies.create(game.rnd.integerInRange(0, game.world.width - 32), game.rnd.integerInRange(0, game.world.height - 32), 'enemy');   


        //  Let gravity do its thing
        enemy.body.gravity.y = 100;
        // enemy.body.gravity.x = 0;

        //  This just gives each star a slightly random bounce value
        // enemy.body.bounce.y = 0.7 + Math.random() * 0.2;
    }



    //  The score
    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();

    lives = game.add.group();
    game.add.text(game.world.width - 100, 10, 'Lives : ', { font: '34px Arial', fill: '#fff' });
    
}

function update() {

        nightsky.tilePosition.x += 2;


    //  Collide the player and the stars with the platforms
    var hitPlatform = game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(enemies, platforms);





    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    game.physics.arcade.overlap(player, enemies, collectStar, null, this);

    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;

        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;

        player.animations.play('right');
    }
    else
    {
        //  Stand still
        player.animations.stop();

        player.frame = 4;
    }
    
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down && hitPlatform)
    {
        player.body.velocity.y = -350;
    }

}



function collectStar (player, enemy) {
    
    // Removes the star from the screen
    player.kill();


    //  Add and update the score
    score += 10;
    scoreText.text = 'Score: ' + score;


}

