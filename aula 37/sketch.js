var database;
var gameState = 0;
var playerCount;
var form,player,game;
var allPlayers;
var carros,mcqueen,carro2,carro3,carro4
var mcqueenimg, carro2img,carro3img,carro4img;
var pista, pistaimg;

function preload() {
  mcqueenimg = loadImage("imagens/chad.png");
  carro2img = loadImage("imagens/mater.png")
  carro3img = loadImage("imagens/van.png")
  carro4img = loadImage("imagens/hudson.png")
  pistaimg = loadImage("imagens/pista.png")
}

function setup(){
  database = firebase.database(); 
  createCanvas(displayWidth-20,displayHeight-30);
  game = new Game();
  game.getState();
  game.start();
}

function draw(){
  if(playerCount === 2){
    game.update(1)
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){    
    game.end();
  }  
}

