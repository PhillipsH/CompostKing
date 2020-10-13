myGame.MainMenu.prototype = {
  preload: function() {
    // Objects have been preloaded at beginning of game in 'Preload' state
  },

  create: function() {

    //this.stage.backgroundColor = '#03826n';
    game.add.sprite(0,0, 'menuBG');

    myGame.showTitleText(game.world.centerY/2, 'CompostKing');

    myGame.startButton = this.add.button(this.world.centerX, 400, 'startButton', this.startGame, this, 1, 0, 2);
    myGame.startButton.anchor.setTo(0.5);

    myGame.showNoteText(325, '*Instructions* \n Click and drag the falling items into the correct bin \n');
  },

  update: function() {

  },
  startGame: function() {
    this.state.start('Leaderboard');
  }

}
