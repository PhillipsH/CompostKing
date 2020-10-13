var selecteItem = null;
var button;
var popup;
var tween = null;
var currentHealth = 0;
var myHealthBar;
var level;
var incorrectSprite;
var incorrectAnim;
var correctSprite;
var correctAnim;
var bonusText;
var db = firebase.firestore();
//var db = firebase.firestore();
myGame.GamePlay1.prototype = {
    init: function(level, spawn, point, trash, speed, pollution) {
      myGame.timerReset = spawn;
      myGame.stage = level;
      myGame.pointIncrement = point;
      myGame.originalIncrement = point;
      myGame.trashIncrement = trash;
      myGame.speed = speed;
      myGame.inARow = 0;
      myGame.inGamePollution = pollution;
    },

    preload: function() {},

    create: function() {
      currentHealth = 0;
// Adding sounds
      correct = game.sound.add('correct');
      incorrect = game.sound.add('incorrect');

// Change Background based on location
      if (myGame.stage == 'China') {
        game.add.sprite(0,0,'chinaBG');
        bgMusic = game.sound.add('chinaGame');
        bgMusic.play();
        // bgMusic.onDecoded.add(bgMusic.fadeIn(500));
        // bgMusic.play();
        // //bgMusic.fadeIn(500);
      } else {
        game.add.sprite(0,0,'background');
      }

// Score button
      game.add.sprite(10, 10, 'meat-count');
      var barConfig = {x: 106, y: 80};
      myGame.myHealthBar = new HealthBar(this.game, barConfig);
      myGame.myHealthBar.setPercent(currentHealth);


//pause button
      pause_label = game.add.text(GAME_WIDTH - 100, 20, 'Pause', { font: '24px Arial', fill: '#fff' });
      pause_label.inputEnabled = true;
      pause_label.events.onInputUp.add(function() {
      game.paused = true;
        choiseLabel = game.add.text(GAME_WIDTH/2, GAME_HEIGHT/2, 'Click anywhere to unpause', { font: '30px Arial', fill: '#fff' });
        choiseLabel.anchor.setTo(0.5, 0.5);
    });
      // Add a input listener that can help us return from being paused
      game.input.onDown.add(unpause, self);

//Bonus Message
    myGame.bonusText = game.add.text(180, 300);
    myGame.bonusText.font = 'Press Start 2P';
    myGame.bonusText.fill = '#ffffff';
    myGame.bonusText.fontSize = 40;
    myGame.bonusText2 = game.add.text(180, 350);
    //myGame.bonusLabel = game.add.text(game.width/2, game.height/2, 'Bonus! /n' + myGame.inARow + ' in a row!', { font: '50px Arial', fill: '#fff' });


  // spawn bins at the bottom of the screen
      myGame.player = this.add.sprite(0, GAME_HEIGHT-150, 'player');
      myGame.player.scale.setTo(1.7,1.7);
      myGame.recycle = this.add.sprite(200, GAME_HEIGHT-150, 'recycle');
      myGame.recycle.scale.setTo(2,2);
      myGame.trash = this.add.sprite(415, GAME_HEIGHT-150, 'trash');
      myGame.trash.scale.setTo(2,2);

  //Give player physics so it can collide
      this.physics.enable(myGame.player, Phaser.Physics.ARCADE);
      this.physics.enable(myGame.recycle, Phaser.Physics.ARCADE);
      this.physics.enable(myGame.trash, Phaser.Physics.ARCADE);

      // Timer to spawn meat
      this.spawnTimer = 0;

      //reset timer every 1000ms
      //myGame.timerReset = 1000;

      //number of seconds passed
      myGame.secondsPassed = 0;

      // Score = 0
      myGame.score = 0;

      //set up the font style for the text that will be added
      this._fontStyle = { font: "32px Arial", fill: "#000", align: "center" };

      //Add score text to the game
      myGame.scoreText = this.add.text(90, 24, "0", this._fontStyle);

      // Create meat group
      myGame.meatGroup = this.add.group();

      myGame.compostGroup = this.add.group();
      myGame.recycleGroup = this.add.group();
      myGame.garbageGroup = this.add.group();

      // myGame.randomNumber = game.rnd.integerInRange(0,5);
      // console.log(myGame.randomNumber);

      //Spawn meat
      spawnMeat(this);

        button = game.add.button(10, 90, 'logo', openWindow, this, 2, 1, 0);
        button.input.useHandCursor = true;

        popup = game.add.sprite(GAME_WIDTH/2, 60, 'error');

        popup.alpha = 0.8;
        popup.anchor.set(0.5);
        popup.inputEnabled = true;

        var pw = (popup.width / 2) - 30;
        var ph = (popup.height / 2) - 8;

        //  And click the close button to close it down again
        var closeButton = game.make.sprite(pw, -ph, 'cancel');
        closeButton.inputEnabled = true;
        closeButton.input.priorityID = 1;
        closeButton.input.useHandCursor = true;
        closeButton.events.onInputDown.add(closeWindow, this);

        //  Add the "close button" to the popup window image
        popup.addChild(closeButton);

        //  Hide it awaiting a click
        popup.scale.set(0.1);

        function openWindow() {

            if ((tween !== null && tween.isRunning) || popup.scale.x === 1)
            {
                return;
            }

            //  Create a tween that will pop-open the window, but only if it's not already tweening or open
            tween = game.add.tween(popup.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);

        }

        function closeWindow() {

            if (tween && tween.isRunning || popup.scale.x === 0.1) {
                return;
            }

            //  Create a tween that will close the window, but only if it's not already tweening or closed
            tween = game.add.tween(popup.scale).to({x: 0.1, y: 0.1}, 500, Phaser.Easing.Elastic.In, true);
        }
    },

    update: function() {
      //Update things here

      //myGame.player location -- move with mouse on the X plane
     // myGame.player.x = this.input.x - myGame.player.width/2;
      // Y will always be the bottom of the screen - player's height - 64px
      //myGame.player.y = GAME_HEIGHT - myGame.player.height - 64;

      // Meat spawn timer - add the time that has elapsed since last update function
      this.spawnTimer += this.time.elapsed;

      //if the timer is greater than the reset variable...
      if(this.spawnTimer > myGame.timerReset) {
          //Reset it
          this.spawnTimer = 0;

          //Spawn candy
          spawnMeat(this);

          // play blinking animation ( animationName, framerate, loop? )
        //  myGame.player.animations.play('blink', 30, false);

          //Add 1 to seconds passed
          myGame.secondsPassed++;

          //If seconds passed are divisible by 60 (no leftover numbers) and timer reset > 300
          if ((myGame.secondsPassed % 120 == 0) && (myGame.timerReset > 300)) {
            // Make the game spawn meat faster
            myGame.timerReset - 100;
          }
      }

      //Make the meat fall 5px
      myGame.meatGroup.forEach(function(meat) {
        meat.y += myGame.speed;
      });

      //Player should eat meat when the two collide
      this.physics.arcade.overlap(myGame.player, myGame.meatGroup, checkCompost);
      this.physics.arcade.overlap(myGame.recycle, myGame.meatGroup, checkRecycle);
      this.physics.arcade.overlap(myGame.trash, myGame.meatGroup, checkTrash);
    }
};


//(550-80+1) + 80
var spawnMeat = function(game) {
  //random drop x location
  var dropX = Math.floor(Math.random() * (531) + 20);

  //generate a random number
  var objectToSpawn = game.rnd.integerInRange(1,29);
  console.log(objectToSpawn);
  var itemString;
  if (objectToSpawn == 1) {
    if (myGame.stage == 'China') {
      itemString = 'chinese1';
    } else if (myGame.stage == 'Brazil') {
      itemString = 'brazilian1';
    } else if (myGame.stage == 'Japan') {
      itemString = 'japanese1';
    } else if (myGame.stage == 'India') {
      itemString = 'indian1';
    } else if (myGame.stage == 'USA') {
      itemString = 'american1';
    }
  } else if (objectToSpawn == 2) {
    if (myGame.stage == 'China') {
      itemString = 'chinese2';
    } else if (myGame.stage == 'Brazil') {
      itemString = 'brazilian2';
    } else if (myGame.stage == 'Japan') {
      itemString = 'japanese2';
    } else if (myGame.stage == 'India') {
      itemString = 'indian2';
    } else if (myGame.stage == 'USA') {
      itemString = 'american2';
    }
  } else if (objectToSpawn == 3) {
    if (myGame.stage == 'China') {
      itemString = 'chinese3';
    } else if (myGame.stage == 'Brazil') {
      itemString = 'brazilian3';
    } else if (myGame.stage == 'Japan') {
      itemString = 'japanese3';
    } else if (myGame.stage == 'India') {
      itemString = 'indian3';
    } else if (myGame.stage == 'USA') {
      itemString = 'american3';
    }
  } else if (objectToSpawn == 4) {
    if (myGame.stage == 'China') {
      itemString = 'chinese4';
    } else if (myGame.stage == 'Brazil') {
      itemString = 'brazilian4';
    } else if (myGame.stage == 'Japan') {
      itemString = 'japanese4';
    } else if (myGame.stage == 'India') {
      itemString = 'indian4';
    } else if (myGame.stage == 'USA') {
      itemString = 'american4';
    }
  } else if (objectToSpawn == 5) {
    if (myGame.stage == 'China') {
      itemString = 'chinese5';
    } else if (myGame.stage == 'Brazil') {
      itemString = 'brazilian5';
    } else if (myGame.stage == 'Japan') {
      itemString = 'japanese5';
    } else if (myGame.stage == 'India') {
      itemString = 'indian5';
    } else if (myGame.stage == 'USA') {
      itemString = 'american5';
    }
  } else if (objectToSpawn == 6) {
    itemString = 'meat';
  } else if (objectToSpawn == 7) {
    itemString = 'poop';
  } else if (objectToSpawn == 8) {
    itemString = 'tomato';
  } else if (objectToSpawn == 9) {
    itemString = 'flower';
  } else if (objectToSpawn == 10) {
    itemString = 'gameboy';
  } else if (objectToSpawn == 11) {
    itemString = 'laptop';
  } else if (objectToSpawn == 12) {
    itemString = 'towel';
  } else if (objectToSpawn == 13) {
    itemString = 'wine';
  } else if (objectToSpawn == 14) {
    itemString = 'styrofoam';
  } else if (objectToSpawn == 15) {
    itemString = 'propane';
  } else if (objectToSpawn == 16) {
    itemString = 'milkJug';
  } else if (objectToSpawn == 17) {
    itemString = 'cosmetics';
  } else if (objectToSpawn == 18) {
    itemString = 'cellphone';
  } else if (objectToSpawn == 19) {
    itemString = 'carton';
  } else if (objectToSpawn == 20) {
    itemString = 'can';
  } else if (objectToSpawn == 21) {
    itemString = 'bottle';
  } else if (objectToSpawn == 22) {
    itemString = 'usb';
  } else if (objectToSpawn == 23) {
    itemString = 'tire';
  } else if (objectToSpawn == 24) {
    itemString = 'teaBag';
  } else if (objectToSpawn == 25) {
    itemString = 'straw';
  } else if (objectToSpawn == 26) {
    itemString = 'envelope';
  } else if (objectToSpawn == 27) {
    itemString = 'diaper';
  } else if (objectToSpawn == 28) {
    itemString = 'chipBag';
  } else if (objectToSpawn == 29) {
    itemString = 'bulb';
  }

  var object = game.add.sprite(dropX, -32, itemString);
  object.scale.setTo(1.7,1.7);

  console.log(object.key);


  //Spawn meat at dropX above the screen, using the image 'meat'
  //var meat = game.add.sprite(dropX, -32, 'meat');
  object.inputEnabled = true;
  object.input.enableDrag();
  object.events.onDragStart.add(drag, this);
  object.events.onDragStop.add(dragStop, this);




  // Give meat physics so it can collide
  game.physics.enable(object, Phaser.Physics.ARCADE);

  // Check if out of bounds
  object.checkWorldBounds = true;

  //Remove meat if out of bounds
  object.events.onOutOfBounds.add(object.kill);

  //Add meat to meat group
  myGame.meatGroup.add(object);
};


var checkCompost = function(player, object) {
  // If meat is hit, remove it!
  object.kill();

  if (object.key === 'flower' ||
      object.key === 'poop' ||
      object.key === 'tomato' ||
      object.key === 'chinese1' ||
      object.key === 'chinese2' ||
      object.key === 'chinese3' ||
      object.key === 'chinese4' ||
      object.key === 'chinese5' ||
      object.key === 'indian1' ||
      object.key === 'indian2' ||
      object.key === 'indian3' ||
      object.key === 'indian4' ||
      object.key === 'indian5' ||
      object.key === 'japanese1' ||
      object.key === 'japanese2' ||
      object.key === 'japanese3' ||
      object.key === 'japanese4' ||
      object.key === 'japanese5' ||
      object.key === 'brazilian1') {
    //increase score
    if (myGame.inARow >= 3 && myGame.inARow < 5) {
      myGame.pointIncrement *= 2;
    } else if (myGame.inARow >= 5 && myGame.inARow < 10) {
      myGame.pointIncrement *= 3;
    } else if (myGame.inARow >=10){
      myGame.pointIncrement *= 5;
    }
    myGame.score += myGame.pointIncrement;
    scoreSum += myGame.pointIncrement;
    myGame.inARow += 1;
    myGame.pointIncrement = myGame.originalIncrement;
    console.log("In a row: " + myGame.inARow);
    correct.play();
    myGame.bonusText.setText(myGame.inARow + ' in a row!');
    if (myGame.inARow >= 3) {
      myGame.bonusText2.setText('BONUS!');
    } else {
      myGame.bonusText2.setText('');
    }
    //set text to the score
    myGame.scoreText.setText(myGame.score);
  } else {
    myGame.bonusText.setText('');
    myGame.bonusText2.setText('');

    incorrect.play();
    myGame.inARow = 0;
    wrong(object);
    currentHealth += myGame.trashIncrement;
    myGame.myHealthBar.setPercent(currentHealth);
    if (currentHealth >= 100) {
          scoreSum = scoreSum + myGame.score;
          console.log(scoreSum);
          console.log('ingame pollution ' + myGame.inGamePollution);
          currentPollution += myGame.inGamePollution
          game.state.start('GameOver');
    }
  }
};

var checkRecycle = function(player, object) {
  // If meat is hit, remove it!
  object.kill();

  if (object.key === 'gameboy' ||
      object.key === 'laptop') {
    //increase score
    if (myGame.inARow >= 3 && myGame.inARow < 5) {
      myGame.pointIncrement *= 2;
    } else if (myGame.inARow >= 5 && myGame.inARow < 10) {
      myGame.pointIncrement *= 3;
    } else if (myGame.inARow >=10){
      myGame.pointIncrement *= 5;
    }
    //myGame.bonus_label = game.add.text(GAME_WIDTH/2, GAME_HEIGHT/2, 'Bonus! /n' + myGame.inARow + ' in a row!', { font: '50px Arial', fill: '#fff' });

    myGame.score += myGame.pointIncrement;
    scoreSum += myGame.pointIncrement;
    myGame.inARow += 1;
    myGame.bonusText.setText(myGame.inARow + ' in a row!');
    myGame.pointIncrement = myGame.originalIncrement;

    console.log("In a row: " + myGame.inARow);
    correct.play();
    if (myGame.inARow >= 3) {
      myGame.bonusText2.setText('BONUS!');
    } else {
      myGame.bonusText2.setText('');
    }
    //set text to the score
    myGame.scoreText.setText(myGame.score);
  } else {
    myGame.bonusText.setText('');
    myGame.bonusText2.setText('');
    incorrect.play();
    myGame.inARow = 0;
    wrong(object);
    currentHealth += myGame.trashIncrement;
    myGame.myHealthBar.setPercent(currentHealth);
    if (currentHealth >= 100) {
          game.state.start('GameOver');
    }
  }
};

var checkTrash = function(player, object) {
  // If meat is hit, remove it!
  object.kill();

  if (object.key === 'flower' ||
      object.key === 'poop' ||
      object.key === 'tomato' ||
      object.key === 'meat') {
    //increase score
    if (myGame.inARow >= 3 && myGame.inARow < 5) {
      myGame.pointIncrement *= 2;
    } else if (myGame.inARow >= 5 && myGame.inARow < 10) {
      myGame.pointIncrement *= 3;
    } else if (myGame.inARow >=10){
      myGame.pointIncrement *= 5;
    }
    myGame.score += myGame.pointIncrement;
    scoreSum += myGame.pointIncrement;
    myGame.inARow += 1;
    myGame.pointIncrement = myGame.originalIncrement;
    console.log("In a row: " + myGame.inARow);
    correct.play();
    myGame.bonusText.setText(myGame.inARow + ' in a row!');
    if (myGame.inARow >= 3) {
      myGame.bonusText2.setText('BONUS!');
    } else {
      myGame.bonusText2.setText('');
    }
    //set text to the score
    myGame.scoreText.setText(myGame.score);
  } else {
    myGame.bonusText.setText('');
    myGame.bonusText2.setText('');

    incorrect.play();
    myGame.inARow = 0;
    wrong(object);
    currentHealth += myGame.trashIncrement;
    myGame.myHealthBar.setPercent(currentHealth);
    if (currentHealth >= 100) {
          scoreSum = scoreSum + myGame.score;
          console.log(scoreSum);
          console.log('ingame pollution ' + myGame.inGamePollution);
          currentPollution += myGame.inGamePollution
          game.state.start('GameOver');
    }
  }
};

var checkTrash = function(player, object) {
  object.kill();
};

// Animation Functions
var drag = function(object, pointer) {
  object.scale.setTo(2.3,2.3);
}

var dragStop = function(object, pointer) {
  object.scale.setTo(1.7,1.7);
}

var wrong = function(object) {
    incorrectSprite = game.add.sprite(object.x, object.y, 'wrongBin');
    incorrectSprite.scale.setTo(2,2);
    incorrectAnim = incorrectSprite.animations.add('explode1');
    incorrectAnim.play(20,false);
}

// var right = function(object) {
//     correctSprite = game.add.sprite(object.x, object.y, 'correctBin',15);
//     correctSprite.scale.setTo(2,2);
//     correctSprite.animations.add('explode',15);
//     correctSprite.animations.play('explode',30,false);
// }
// And finally the method that handels the pause menu
    function unpause(event){
        // Only act if paused
        if(game.paused){
           // Unpause the game
                game.paused = false;
                choiseLabel.destroy();

        }
    };
