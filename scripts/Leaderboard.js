myGame.Leaderboard.prototype = {
  preload: function() {
    // Objects have been preloaded at beginning of game in 'Preload' state
  },

  create: function() {
    
    game.add.sprite(0,0, 'leaderboard');

    yes_label = game.add.text(GAME_WIDTH - 180, GAME_HEIGHT -500, 'Yes', { font: '50px Arial', fill: '#fff' });
    no_label = game.add.text(GAME_WIDTH - 540, GAME_HEIGHT -500, 'No', { font: '50px Arial', fill: '#fff' });
    var okay_label;
    yes_label.inputEnabled = true;
    yes_label.events.onInputUp.add(function() {
      player = prompt("Please enter your name", "");
      firstTime = false;
        game.state.start('Map');
    
  });
    no_label.inputEnabled = true;
    no_label.events.onInputUp.add(function() {
      game.state.start('Map');
    });

    
    
    //myGame.showNoteText(325, '*Instructions* \n Click and drag the falling items into the correct bin \n');
  },

  update: function() {
    
  },
  startGame: function() {
    this.state.start('Map', true, false, 'true');
  },
  startGame2: function() {
    this.state.start('Map', true, false, 'false');
  }
}

