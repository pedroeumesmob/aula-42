class Game{
    constructor(){
        this.msg = createElement('h4');
    };
    getState(){
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value",function(data) {
            gameState = data.val();
        })
    }
    update(state){
        database.ref('/').update({
            gameState:state
        })
    }                                                       
    async start(){
        if (gameState === 0){
            player = new Player();
            var playerCountRef = await database.ref('playerCount').once("value");
            if(playerCountRef.exists()){
                playerCount = playerCountRef.val();
                player.getCount();
            }else{
                playerCount = 0;
            }
            form = new Form();
            form.display(playerCount);
        }
        mcqueen = createSprite(100,200);
        mcqueen.addImage("carro1",mcqueenimg);

        carro2 = createSprite(300,200);
        carro2.addImage("carro2",carro2img);

        carro3 = createSprite(500,200);
        carro3.addImage("carro3",carro3img);

        carro4 = createSprite(700,200);
        carro4.addImage("carro4",carro4img);
        carro4.scale = 0.78;

        carros = [mcqueen,carro2,carro3,carro4];

    }
    play(){
        form.hide();
        textSize(30)
        text("começando...",120,100);
        Player.getPlayerInfo();
        player.getCarsAtEnd()
        if(allPlayers!== undefined){
            image(pistaimg,0,-displayHeight*4,displayWidth,displayHeight*5);
            var display_position = 130;
            var index = 0;
            var x = 175;
            var y;

            for(var plr in allPlayers){

                index = index +1;
                x = x +200;
                y = displayHeight-allPlayers[plr].distance;
                carros[index-1].x = x;
                carros[index-1].y = y;

                if(index === player.index){
                    this.playerButton = createButton(player.name);
                    this.playerButton.position(x-25,);
                    stroke(10);
                    fill('#3e4041');
                    ellipse(x,y,90,90);
                    carros[index-1].shapeColor = "red";
                    camera.position.x = displayWidth/2;
                    camera.position.y = carros[index-1].y;
                }
                //display_position +=20;
                //textSize(15);
                //text(allPlayers[plr].name+":"+allPlayers[plr].distance,120,display_position);
            } 
        }
        if(keyIsDown(87)||keyIsDown(119) &&player.index!== null){
            player.distance+=10;
            player.update();
        }

        if(player.distance>3860){
            gameState = 2;
            player.rank+=1;
            Player.updateCarsAtEnd(player.rank);
            this.msg.html("1°" +player.name);
            this.msg.position(displayWidth/2-70,80);
        }

        drawSprites();
    }
    end(){
        console.log("gameEnd");
        console.log(player.name);
    }
    
}