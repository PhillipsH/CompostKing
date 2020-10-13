myGame.Preload.prototype = {
  preload: function() {
    // Preload font for the game
    this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

    // Animation sprite
    this.load.spritesheet('wrongBin', 'img/wrongBin.png', 124, 118, 6);
    this.load.spritesheet('correctBin', 'img/CorrectBin.png', 124, 139, 15);

    // LeaderBoard
    this.load.image('leaderboard', 'img/leaderboard.png');
    //confirm and decline buttons
    this.load.image('confirm', 'img/confirm.png');
    this.load.image('decline', 'img/decline.png');

    //easter egg
    this.load.image('error', 'img/errorMessage.png');
    this.load.image('cancel', 'img/cancel.png');
    this.load.image('logo', 'img/CompostKingLogo.png');
    //Preload start button
    this.load.spritesheet('startButton', 'assets/ui/button-start.png', 256, 64);
    this.load.image('chinaButton', 'assets/ui/button_china.png');
    this.load.image('indiaButton', 'assets/ui/button_india.png');
    this.load.image('brazilButton', 'assets/ui/button_brazil.png');
    this.load.image('canadaButton', 'assets/ui/button_canada.png');

    //Dialog background
    this.load.image('dialogWindow', 'assets/ui/dialog.png');

    //Sound
    this.load.audio('chinaGame', 'assets/audio/China_Game.mp3');
    this.load.audio('chinaSelection', 'assets/audio/China_Selection.mp3');
    this.load.audio('correct', 'img/correct.mp3');
    this.load.audio('incorrect', 'img/incorrect.mp3');

    // this.load.audio('button', [ 'assets/audio/button.mp3', 'assets/audio/button.wav' ]);
    // this.load.audio('pen', [ 'assets/audio/pen.mp3', 'assets/audio/pen.wav' ]);
    // this.load.audio('meow', [ 'assets/audio/meow.mp3', 'assets/audio/meow.wav' ]);
    // this.load.audio('dice', [ 'assets/audio/dice.mp3', 'assets/audio/dice.wav' ]);

      this.load.image('background', 'img/bg-floor.png');
      this.load.image('player', 'img/compost.png');
      this.load.image('meat-count', 'img/meat-count.png');
      this.load.image('recycle', 'img/recycle.png');
      this.load.image('trash', 'img/trash.png');



      //chinese 5
      this.load.image('chinese1', 'img/dimsum.png');
      this.load.image('chinese2', 'img/chowMein.png');
      this.load.image('chinese3', 'img/springRolls.png');
      this.load.image('chinese4', 'img/f.png');
      //this.load.image('chinese5', 'img/dimsum2.png');
      //this.load.image('chinese6', 'img/chinesePale.png');
      this.load.image('chinese5', 'img/bubbleTea.png');



      //japanese 5
      this.load.image('japanese1', 'img/bento.png');
      this.load.image('japanese2', 'img/sashimi.png');
      this.load.image('japanese3', 'img/ramen.png');
      this.load.image('japanese4', 'img/japanese4.png');
      this.load.image('japanese5', 'img/japanese5.png');


      //american 5
      this.load.image('american1', 'img/fries.png');
      this.load.image('american2', 'img/burger.png');
      this.load.image('american3', 'img/pizza.png');
      this.load.image('american4', 'img/hotdog.png');
      //this.load.image('american5', 'img/mac.png');
      this.load.image('american5', 'img/kfc.png');

      //indian 5
      this.load.image('indian1', 'img/samosa.png');
      this.load.image('indian2', 'img/riceIndian.png');
      this.load.image('indian3', 'img/indianCurry.png');
      this.load.image('indian4', 'img/butterChicken.png');
      this.load.image('indian5', 'img/riceIndian.png')
;
      //other 24
      this.load.image('meat', 'img/meat.png');
      this.load.image('poop', 'img/poop.png');
      this.load.image('tomato', 'img/tomato.png');
      this.load.image('flower', 'img/flower.png');
      this.load.image('gameboy', 'img/gameboy.png');
      this.load.image('laptop', 'img/laptop.png');
      this.load.image('towel', 'img/towel.png');
      this.load.image('wine', 'img/wine.png');
      this.load.image('styrofoam', 'img/styrofoam.png');
      this.load.image('propane', 'img/propane.png');
      this.load.image('milkJug', 'img/milkJug.png');
      this.load.image('cosmetics', 'img/cosmetics.png');
      this.load.image('cellphone', 'img/cellphone.png');
      this.load.image('carton', 'img/carton.png');
      this.load.image('can', 'img/can.png');
      this.load.image('bottle', 'img/bottle.png');
      this.load.image('usb', 'img/usb.png');
      this.load.image('tire', 'img/tire.png');
      this.load.image('teaBag', 'img/teaBag.png');
      this.load.image('straw', 'img/straw.png');
      this.load.image('envelope', 'img/envelope.png');
      this.load.image('diaper', 'img/diaper.png');
      this.load.image('chipBag', 'img/chipBag.png');
      this.load.image('bulb', 'img/bulb.png');

      //brazilian food 5
      this.load.image('brazilian1', 'img/brazilian1.png');
      this.load.image('brazilian2', 'img/brazilian2.png');
      this.load.image('brazilian3', 'img/brazilian3.png');
      this.load.image('brazilian4', 'img/brazilian4.png');
      this.load.image('brazilian5', 'img/brazilian5.png');





      //Background Images
      this.load.image('chinaBG', 'img/chinaBG.png');
      this.load.image('menuBG', 'img/Menu.png');
      this.load.image('bg-floor', 'img/bg-floor.png');
      this.load.image('brazilBG', 'img/brazilBG.png');
      this.load.image('japanBG', 'img/japanBG.png');
      this.load.image('indiaBG', 'img/indiaBG.png');
      this.load.image('worldMap', 'img/map.png');
      this.load.image('town', 'img/town.png');

      //SliderMap
      this.load.image("block1", "assets/pinkBlock.png");
      this.load.image("block2", "assets/blueBlock.png");
      this.load.image("block3", "assets/greenBlock.png");
      this.load.image("block4", "assets/yellowBlock.png");
      this.load.image("block5", "assets/purpleBlock.png");
      this.load.image("tutorialBlock", "assets/tutorialBlock.png");
      this.load.image("mapBlock", "assets/mapBlock.png");
      this.load.image("aboutBlock", "assets/aboutBlock.png");


      this.load.image("arrow1", "assets/arrow1.png");
      this.load.image("arrow2", "assets/arrow2.png");
      this.load.image("accept", "assets/stripe.png");
      this.load.image("box", "assets/box.png");
      this.load.image("cancel", "assets/cancel_paused.png");
      this.load.image("char1", "assets/char1.png");
      this.load.image("char2", "assets/char2.png");
      this.load.image("char3", "assets/char3.png");
      this.load.image("char4", "assets/char4.png");
      this.load.image("char5", "assets/char5.png");

      slider = new phaseSlider(game);

  },

  create: function() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.scale.setScreenSize(true);
    this.stage.smoothed = false;

    this.state.start('Boot');
  },
  update: function() {}
}
