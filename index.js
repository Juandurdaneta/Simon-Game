//Variables
var level = 1;
var buttons = ["blue", "green", "red", "yellow"];
var gamePattern = [];
var clickedPattern = [];
var gameStatus = false; //FALSE IF GAME HASNT STARTED // TRUE IF IT ALREADY HAS STARTED
var index = 0;
var record = 0;


//FUNCTIONS

  //Function sound and animation
  function playSoundAndAnimation(a) {
    $("#" + a).addClass("animation");
    setTimeout(function () {
      $("#" + a).removeClass("animation");
    }, 120);
  
    switch (a) {
      case "blue":
        var blueSound = new Audio("sounds/blue.mp3");
        blueSound.play();
        break;
      case "green":
        var greenSound = new Audio("sounds/green.mp3");
        greenSound.play();
        break;
      case "red":
        var redSound = new Audio("sounds/red.mp3");
        redSound.play();
        break;
      case "yellow":
        var yellowSound = new Audio("sounds/yellow.mp3");
        yellowSound.play();
        break;
  
      case "wrong":
        var wrongSound = new Audio("sounds/wrong.mp3");
        wrongSound.play();
        $('body').toggleClass('gameOver')
        setTimeout(() => {
          $('body').toggleClass('gameOver');
        }, 120);
       
        break;
  
      default:
        break;
    }
  }
  
  //Function next sequence
  
  function nextSequence(){
    var randomNumber = Math.floor(Math.random()*buttons.length );
    var randomColor = buttons[randomNumber];
    gamePattern.push(randomColor);
    playSoundAndAnimation(randomColor);
   
  }
  
  //Function Game Over
  
  function gameOver(){
    gamePattern = [];
    clickedPattern = [];
    level = 1;
    gameStatus = false;
    playSoundAndAnimation("wrong");
    $("#level-title").text("GAME OVER, Press any key to restart");
    return;
  }
  
  
  //Function Logic
  
  function logic(c){
  
    if (c === gamePattern[index] && index < gamePattern.length){
      index++;
    } else {
      gameOver();
      index = 0;
    }
  
    if(index === gamePattern.length && gameStatus){
      clickedPattern = [];
      level++;
      if (level > record ){
        $("#current-record").text("Highest Score : Level " + level);
        record = level;
      }
      index = 0;
      $("#level-title").text("Level "+ level)  
      setTimeout(() => {
        nextSequence()
      }, 1000 );
    }
  
  }



//Click event

$(".btn").on('click', function(e){
  var selectedButton = e.target.id;
  clickedPattern.unshift(selectedButton);
  playSoundAndAnimation(selectedButton);
  logic(selectedButton);
  
});


//Keyboard event

  $(document).on('keydown', function () {
    if (gameStatus === false){
      nextSequence();
      gameStatus = true;
      $('#level-title').text('Level: '+level);
    }
  });

