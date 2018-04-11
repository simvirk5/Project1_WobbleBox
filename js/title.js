
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv'); 

var title = {
	create: function  () {
		var nameLabel = game.add.text(500, 300, "Press ---> to Start", {
			font: '30px Arial', fill: '#ffffff'
		});
		cursors = game.input.keyboard.createCursorKeys();
	},
	update: function (){
		console.log('update of title');
		if (cursors.right.isDown) {
			game.state.add('play', play);
			game.state.start('play');
		}
	}
}
game.state.add('title', title);
game.state.start('title');

