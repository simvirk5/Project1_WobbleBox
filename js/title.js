var titleState = {

	function create () {

		var nameLabel = game.add.text(160, 80, "Press enter to Start", {
			font: '14px Raleway', fill: '#ffffff'
		});

		game.input.activePointer.capture = true;
	},

	function update (){

		if (game.input.activePointer.isDown) {
			game.state.start('play')
		}
	}
}