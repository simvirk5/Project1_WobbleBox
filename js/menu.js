// //display name of the game and instructions. Wait for user to perform action before calling the next state.

// var menuState= {

// 	preload: function() {
// 		game.load.image()
// 	}
// 	create: function(){

// 		game.physics.startSystem(Phaser.Physics.ARCADE);

// 		var title = game.add.sprite('title');

// 		var titleBox = game.add.sprite(600,90,'titleBox');

// 		game.physics.ARCADE.enable(this.'titleBox');

// 		game.add.tween(this.titleBox).to({y:80}, 900).start();
		

// 		var name = game.add.text(160, 80, "Wobble Box", {
// 								font: '14px Raleway', fill: '#ffffff'});

// 		var start = game.add.text(160, 80, "Press enter to start")
// 								font: '14px Raleway', fill: '#ffffff'});

// 		var enterKey = game.input.keyboard.addkey(Phaser.Keyboard.enter); 
// 		//function begins when the user presses down the key
// 		enterKey.onDown.addOnce(this.start, this);
	
// 	update: function(){
// 		if (game.input.activePointer.isDown) {
// 			game.state.start('play')
// 		}
// 	}
// }