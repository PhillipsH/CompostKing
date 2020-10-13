import Firebase from 'Firebase';

var input = document.getElementById("name").value;

//Image assets

var background = new Image();
background.src = "assets/TutBG.png";

var itemImage = new Image();
itemImage.src = "assets/bread.png";

var pop = new Audio("assets/pop.mp3");
pop.volume=0.1;
var correct = new Audio("assets/true.mp3");
correct.volume=0.1;
var incorrect = new Audio("assets/incorrect.mp3");
//Create the canvas and the context object variables
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

/////// Falling Objects ////////
var spawnLineY = 100;
var spawnRate = 1500;
var spawnRateOfDescent = 0.50;
var lastSpawn = -1;
var startTime = Date.now();
var objectsOnScreen = [];
var objectsLeftover = [];
var objectsTaken = [];
var seconds = 0;
var el = document.getElementById('seconds-counter');

var elem = document.getElementById("foodBar");
var width = 100;
var id;

/*
objects.addEventListener(onclick, check);

function check() {
    window.alert("hi");
}
*/

function incrementSeconds() {
    seconds += 1;
    el.innerText = "Timer Score: " + seconds + " seconds.";
}

var cancel = setInterval(incrementSeconds, 1000);

function greetingMenu() {
    // var myWindow = window.open("", "MsgWindow", "width=200,height=100");
    // myWindow.document.write("<p>Login: " + myWindow.name + "</p>");
    startGame();



}



function startGame() {
    ctx.drawImage(background,0,0);

}

function startFood(){
    var elem = document.getElementById("user");
    elem.parentNode.removeChild(elem);
    id = setInterval(frame, 550);
    incrementSeconds();
    frame();
    animate();
}
function frame() {
    if (width <= 0) {
        clearInterval(id);
        alert("Game Over. Your total score is: " + seconds + " seconds! New top score!");
        document.location.reload();
    } else {
        width--;
        elem.style.width = width + '%';
        document.getElementById("label").innerHTML = width * 1  + '%';
    }
}

function update(x) {
    if (width > 0 && width < 100) {
        if (x > 0) {

            correct.pause();
            correct.currentTime = 0;
            correct.play();
            width = width + x;
            if (width > 100){
                width = 100;
            }
            document.getElementById("foodBar").style.background= "green";
            elem.style.width = width + '%'
            document.getElementById("label").innerHTML = width * 1 + '%';

        } else {
            incorrect.pause();
            incorrect.currentTime = 0;
            incorrect.play();
            width = width + x;
            if (width < 0) {
                width = 0;
                document.getElementById("label").style.background= "red";
            }
            document.getElementById("foodBar").style.background= "red";
            elem.style.width = width + '%'
            document.getElementById("label").innerHTML = width * 1 + '%';
        }

    }
}

clickerHandler();

function clickerHandler() {
    canvas.onclick = function(e) {
        var x = e.clientX;
        var y = e.clientY;
        for (var i=0; i < objectsOnScreen.length; i++) {
            var object = objectsOnScreen[i];
            if (x > object.x
                && x < object.x + 50
                && y > object.y
                && y < object.y + 50) {
                //console.log("Food was clicked!!" + x + " " + y);
                objectsTaken.push(object);
                objectsOnScreen.splice(i, 1);
                update(object.value);
            } //else {
               // objectsTaken.push(object);
           // }
        }
        //objectsOnScreen = objectsLeftover;
    };
}



//x.addEventListener("webkitAnimationEnd", myEndFunction);


function spawnRandomObjects() {
    var t;
    t = Math.floor(Math.random() * 10);
    var srcString;
    var point;
    if (t == 0) {
        srcString = "assets/bread.png";
        point = 5;
    } else if (t == 1) {
        srcString = "assets/poop.png";
        point = 20;
    } else if (t == 2) {
        srcString = "assets/pie.png";
        point = 5;
    }else if (t == 3) {
        srcString = "assets/pencil.png";
        point = -10;
    }else if (t == 4) {
        srcString = "assets/lipstick.png";
        point = -10;
    }else if (t == 5) {
        srcString = "assets/laptop.png";
        point = -20;
    }else if (t == 6) {
        srcString = "assets/bag.png";
        point = 5;
    }else if (t == 7) {
        srcString = "assets/steak.png";
        point = 10;
    }else if (t == 8) {
        srcString = "assets/sneakers.png";
        point = -20;
    }else if (t == 9) {
        srcString = "assets/pretzel.png";
        point = 5;
    }

    var object = {
        type: t,
        x: Math.random()*(canvas.width-60) + 50,
        y: spawnLineY,
        source: srcString,
        value: point,
    }
    objectsOnScreen.push(object);
}

function animate() {
    var time = Date.now();
    if (time > (lastSpawn + spawnRate)) {
        lastSpawn = time;
        spawnRandomObjects();
        pop.pause();
        pop.currentTime = 0;
        pop.play();
    }
    requestAnimationFrame(animate);
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.drawImage(background,0,0);
    //move objects down the canvas
    for (var i=0; i<objectsOnScreen.length; i++) {
        var object = objectsOnScreen[i];
        object.y += spawnRateOfDescent;
        ctx.beginPath();
        ctx.drawImage(createImage(objectsOnScreen[i].source),objectsOnScreen[i].x,objectsOnScreen[i].y,50,50);
       // ctx.arc(object.x, object.y, 8, 0, Math.PI*2);
        //ctx.closePath();
        ctx.fillStyle = object.type;
        ctx.fill();
    }
}

function createImage(x) {
    var image = new Image();
    image.src = x;
    return image;
}




/*
var ctx = get
function startGame() {
    myGamePiece = new component(30, 30, "red", 10, 120);
    myGamePiece.gravity = 0.05;
    myScore = new component("30px", "Consolas", "black", 280, 40, "text");
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
*/
