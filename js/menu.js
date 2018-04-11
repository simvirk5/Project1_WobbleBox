var titleState = {

	function create () {

		var nameLabel = game.add.text(160, 80, "Press enter to Start", {
			font: '14px Raleway', fill: '#ffffff'
		});

   	 	cursors = game.input.keyboard.createCursorKeys();
	},

	function update (){

		if (cursors.right.isDown) {
			game.state.start('play')
		}
	}
}			game.state.add('title');
			game.state.start('title');