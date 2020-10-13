var currentPollution = 0;
var activate;
var text;

myGame.Map.prototype = {
  preload: function() {
  },

  create: function() {
    game.add.image(0,0, 'worldMap');

    if (!player) {
      score_label = game.add.text(GAME_WIDTH - 200, 20, 'Total Score: '+ scoreSum, { font: '24px Arial', fill: '#fff' });
    } else {
      name_label = game.add.text(GAME_WIDTH - 200, 20, 'Hi '+player, { font: '24px Arial', fill: '#fff' });
      score_label = game.add.text(GAME_WIDTH - 200, 50, 'Total Score: '+ scoreSum, { font: '24px Arial', fill: '#fff' });
    }
    
    //PollutionBar
    pollution_label = game.add.text(GAME_WIDTH - 625, 50, 'Pollution Level '+currentPollution + '%', { font: '24px Arial', fill: '#fff' });
    var barConfig = {x: GAME_WIDTH - 530, y: 30};
    myGame.pollutionBar = new HealthBar(this.game, barConfig);
    myGame.pollutionBar.setPercent(currentPollution);
    
    //Slider Functionality
    //var char1 = game.add.image(0,0,"char1");
    var char2 = game.add.image(0,0,"char2");
    var char3 = game.add.image(0,0,"char3");
    var char4 = game.add.image(0,0,"char4");
    var char5 = game.add.image(0,0,"char5");

    var group1 = game.add.group();
    group1.width = 500;
    group1.height = 400;
    //char1.scale.setTo(0.5, 0.5);
    //char1.x = 500/2 - char1.width/2;
    //char1.y = 100;

    //////////
    var group2 = game.add.group();
    group2.width = 500;
    group2.height = 400;
    char2.scale.setTo(0.5, 0.5);
    char2.x = 500/2 - char2.width/2;
    char2.y = 100;
    ///////////
    var group3 = game.add.group();
    group3.width = 500;
    group3.height = 400;
    char3.scale.setTo(0.5, 0.5);
    char3.x = 500/2 - char3.width/2;
    char3.y = 100;
    ////////////
    var group4 = game.add.group();
    group4.width = 500;
    group4.height = 400;
    char4.scale.setTo(1, 1);
    char4.x = 500/2 - char4.width/2;
    char4.y = 100;

    var group5 = game.add.group();
    group5.width = 500;
    group5.height = 400;
    char5.scale.setTo(1, 1);
    char5.x = 500/2 - char5.width/2;
    char5.y = 100;

 

    var block1 = game.add.image(0,0,"tutorialBlock");
    var block2 = game.add.image(0,0,"block2");
    var block3 = game.add.image(0,0,"block3");
    var block4 = game.add.image(0,0,"block4");
    var block5 = game.add.image(0,0,"block5");

    group1.add(block1);
    //group1.add(char1);
    /////
    group2.add(block2);
    group2.add(char2);
    /////
    group3.add(block3);
    group3.add(char3);
    /////
    group4.add(block4);
    group4.add(char4);

    group5.add(block5);
    group5.add(char5);


    slider.createSlider({
      customSliderBG: false,
      sliderBGAlpha: 0.8,
      x: game.width / 2 - 500 / 2,
      y: game.height / 2 - 400 / 2,
      customHandleNext: "arrow2",
      customHandlePrev: "arrow1",
      objects:[group1, group2, group3, group4, group5],
      onNextCallback: function() {
        window.console.log("next");
        if (text) {
          text.destroy();
        }
        var index = slider.getCurrentIndex();
        var country;
        if (index == 0) {
          country = "China";
        } else if (index == 1) {
          country = "Brazil";
        } else if (index == 2) {
          country = "India";
        } else if (index == 3) {
          country = "USA";
        } else if (index == 4) {
          country = "Japan"
        }

        text = game.add.text(100,400,"You selected " + country,{
          fontSize: 22,
          fill: "#1e1e1e"
        });
        text.updateText();

        text.x = game.width/2 - text.width/2;
        text.y = 80;

        //var img = game.add.image(text.x+text.width+10, text.y-30, "char"+(index+1));
        //img.scale.setTo(0.2, 0.2);


      },
      onPrevCallback: function(){
        window.console.log("prev")
      }
    });

    var btn = game.add.image((game.width/2 - 80/2), (game.height / 2 - 80 / 2)+180, "accept");
    btn.inputEnabled = true;
    btn.events.onInputDown.add(function (e, pointer) {
      var index = slider.getCurrentIndex();
      if (index == 0) {
        this.state.start('GamePlay1', true, false, 'China', 350);
      } else if (index == 1) {
        this.state.start('GamePlay1', true, false, 'tutorial', 1000);

      }
    },this);
  },

  update: function() {
    
  },
  startGameChina: function() {
    this.state.start('GamePlay1', true, false, 'China', 350);
  },
  startGame: function() {
    this.state.start('GamePlay1', true, false, 'tutorial', 1000);
  }
}

