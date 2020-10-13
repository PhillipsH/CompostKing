myGame.EndLeaderboard.prototype = {
  preload: function() {
    // Objects have been preloaded at beginning of game in 'Preload' state
  },

  create: function() {
    //this.stage.backgroundColor = '#03826n';
    game.add.sprite(0,0, 'bg-floor');

    myGame.showTitleText(game.world.centerY/2, 'LeaderBoards');

    myGame.returnButton = this.add.button(this.world.centerX, 800, 'startButton', this.returnGame, this, 1, 0, 2);
    myGame.returnButton.anchor.setTo(0.5);


    getData();
    console.log("GameOver")
    },

  update: function() {

  },
  returnGame: function() {
    this.state.start('Map');
  }
}
