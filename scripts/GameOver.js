myGame.GameOver.prototype = {
  preload: function() {
    // Objects have been preloaded at beginning of game in 'Preload' state
  },

  create: function() {
    //this.stage.backgroundColor = '#03826n';
    game.add.sprite(0,0, 'menuBG');

    myGame.showTitleText(game.world.centerY/2, 'Game Over!');

    myGame.returnButton = this.add.button(this.world.centerX, 400, 'startButton', this.returnGame, this, 1, 0, 2);
    myGame.returnButton.anchor.setTo(0.5);

    if (player != "" && player != null) {
        storeData();
    }

    console.log("GameOver")
    },

  update: function() {

  },
  returnGame: function() {
    this.state.start('EndLeaderboard');
  }
}
