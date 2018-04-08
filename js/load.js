//load assets(images, music), labes
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');

var player;
var platforms;
var cursors;

var stars;
var score = 0;
var scoreText;

var loadState = {

	preload: function() {

		game.load.image('sky', 'assets/images/sky.png');
	    game.load.image('ground', 'assets/images/platform.png');
	    game.load.image('star', 'assets/images/star.png');
	    game.load.spritesheet('dude', 'assets/images/dude.png', 32, 48);

}
	create: function(){
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.state.start('play');
	}
}




