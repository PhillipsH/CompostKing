var selecteItem = null;
var button;
var popup;
var tween = null;

myGame.China.prototype = {
    preload: function() {
      this.load.image('error', 'img/errorMessage.png');
      this.load.image('cancel', 'img/cancel.png');
      this.load.image('logo', 'img/CompostKingLogo.png');
    },

    create: function() {
      
      // Background
      game.add.sprite(0, 0, 'chinaBG');
      game.add.sprite(10, 10, 'meat-count');
      bgMusic = game.sound.add('chinaGame');
      bgMusic.play();
      // spawn myGame.player at the bottom of the page
      myGame.player = this.add.sprite(0, GAME_HEIGHT-150, 'player');
      myGame.player.scale.setTo(1.7,1.7);
      myGame.recycle = this.add.sprite(200, GAME_HEIGHT-150, 'recycle');
      myGame.recycle.scale.setTo(2,2);
      myGame.trash = this.add.sprite(415, GAME_HEIGHT-150, 'trash');
      myGame.trash.scale.setTo(2,2);
      // add blinking animation ( animationName, animation frame order )
      //myGame.player.animations.add('blink', [0, 0, 1, 2, 2, 2, 2, 1, 0, 0]);


      //Give player physics so it can collide
      this.physics.enable(myGame.player, Phaser.Physics.ARCADE);
      this.physics.enable(myGame.recycle, Phaser.Physics.ARCADE);
      this.physics.enable(myGame.trash, Phaser.Physics.ARCADE);

      // Timer to spawn meat
      this.spawnTimer = 0;

      //reset timer every 1000ms
      myGame.timerReset = 1000;

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

       button = game.add.button(10, 76, 'logo', openWindow, this, 2, 1, 0);
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
        meat.y += 5;
      });

      //Player should eat meat when the two collide
      this.physics.arcade.overlap(myGame.player, myGame.meatGroup, checkCompost);
      this.physics.arcade.overlap(myGame.recycle, myGame.meatGroup, checkRecycle);
      this.physics.arcade.overlap(myGame.trash, myGame.meatGroup, checkTrash);

      correct = game.sound.add('correct');
      incorrect = game.sound.add('incorrect');
    }
};

var spawnMeat = function(game) {
  //random drop x location
  var dropX = Math.floor(Math.random() * GAME_WIDTH);

  //generate a random number
  var objectToSpawn = game.rnd.integerInRange(1,6);
  console.log(objectToSpawn);
  var itemString;
  if (objectToSpawn == 1) {
    itemString = 'poop';
  } else if (objectToSpawn == 2) {
    itemString = 'tomato';
  } else if (objectToSpawn == 3) {
    itemString = 'flower';
  } else if (objectToSpawn == 4) {
    itemString = 'meat';
  } else if (objectToSpawn == 5) {
    itemString = 'gameboy';
  } else if (objectToSpawn == 6) {
    itemString = 'laptop';
  }

  var object = game.add.sprite(dropX, -32, itemString);
  object.scale.setTo(1.7,1.7);

  console.log(object.key);


  //Spawn meat at dropX above the screen, using the image 'meat'
  //var meat = game.add.sprite(dropX, -32, 'meat');
  object.inputEnabled = true;
  object.input.enableDrag();
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
      object.key === 'meat') {
    //increase score
    myGame.score += 1;
    correct.play();

    //set text to the score
    myGame.scoreText.setText(myGame.score);
  } else {
    incorrect.play();
  }

};

var checkRecycle = function(player, object) {
  // If meat is hit, remove it!
  object.kill();

  if (object.key === 'gameboy' ||
      object.key === 'laptop') {
    //increase score
    myGame.score += 1;
    correct.play();

    //set text to the score
    myGame.scoreText.setText(myGame.score);
  } else {
    incorrect.play();
  }

};

var checkTrash = function(player, object) {
  // If meat is hit, remove it!
  object.kill();

  // if (object.key === 'flower') {
  //   //increase score
  //   myGame.score += 1;
  //
  //   //set text to the score
  //   myGame.scoreText.setText(myGame.score);
  //}

};

