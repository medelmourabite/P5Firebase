var canvas;
var score;
var button;
var initialInput;
var submitButton;
var database;
var provider;
var user;

function setup() {
  canvas = createCanvas(100, 100);
  score = 0;
  createP('Click the button to get points.')
  button = createButton('click');
  button.mousePressed(increaseScore);
  initialInput = createInput('initials');
  submitButton = createButton('submit');
  submitButton.mousePressed(submitScore);

  var config = {
    /** YOUR CONFIG HERE */
  };
  firebase.initializeApp(config);
  provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
    console.log(result);
    user = result.user;
    database = firebase.database();
  }).catch(function(error) {
    alert("Authentification error");
    console.error(error);
  });
}

function submitScore() {
  var data = {
    initials: initialInput.value(),
    score: score
  }
  console.log(data);
  var ref = database.ref( "users/" + user.uid + '/scores');
  ref.push(data);
}

function increaseScore() {
  score++;
}

function draw() {
  background(0);
  textAlign(CENTER);
  textSize(32);
  fill(255);
  text(score, width / 2, height / 2);
}