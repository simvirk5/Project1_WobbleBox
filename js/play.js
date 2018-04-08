//game logic

var playState = {

	create: function () {
	   	game.add.sprite(0, 0, 'sky');
	    game.add.sprite(0, 0, 'lighting');
	    platforms = game.add.group();
	    platforms.enableBody = true;
	    
	    var ground = platforms.create(0, game.world.height - 64, 'ground');
	    ground.scale.setTo(2, 2); 
	    ground.body.immovable = true;

	    player = game.add.sprite(32, game.world.height - 150, 'unicorn');
	    game.physics.arcade.enable(player);
	    player.anchor.setTo(.5,1);
	    player.animations.add('wait', [0,1], 4);
	    player.body.bounce.y = 1;
	    player.body.bounce.x = 1;
	    player.body.gravity.y = 300;
	    player.body.collideWorldBounds = true;
	    player.animations.add('left', [4, 3, 2, 1], 10, true);
	    player.animations.add('right', [1, 2, 3, 4], 10, true);

	    cursors = game.input.keyboard.createCursorKeys();

	    enemy = game.add.group();
	    stars.enableBody = true;
	    for (var i = 0; i < 12; i++)

	    {
	        var enemy = enemy.create(i * 70, 0, 'enemy');
	        star.body.gravity.y = 300;
	        star.body.bounce.y = 0.7 + Math.random() * 0.2;
	    }

	    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
	    cursors = game.input.keyboard.createCursorKeys();





}	//redraw the canvas after every fram
	update: function () {

		player.animations.play('wait');
		if (cursors.left.isDown)
    	{
        	player.body.velocity.x = -150;
	        player.animations.play('left');
	    }
	    else if (cursors.right.isDown)
	    {
	        player.body.velocity.x = 150;
	        player.animations.play('right');
	    }
	    else
    	{
        player.animations.stop();
        player.frame = 0;
    	}

    var hitPlatform = game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(stars, platforms);

    game.physics.arcade.overlap(player, enemy, collectStar, null, this);

    player.body.velocity.x = 0;
}

function lose (player, enemy) {
    
    // Removes the star from the screen
    player.kill();

    //  Add and update the score
    score -= 1;
    scoreText.text = 'Score: ' + score;

}