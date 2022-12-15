(function(){
    window.Map = function(){
        this.mapCode = [
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9]
        ]
    }
    Map.prototype.render = function(mapGame){
        //render the map
        for(let i = 0; i<mapGame.row; i++){
            for(let j = 0;j<mapGame.col;j++){
                if(this.mapCode[i][j] != 0){
                    game.setColor(i ,j ,this.mapCode[i][j]);
                }
                //$("tr").eq(i).children("td").eq(j).html(this.mapCode[i][j]);
            }
        }
    }
    Map.prototype.checkRemove = function(){
        //Check if there exists 1 row that does not contain 0
        for(let i = 0; i < 20;i++){
            if(this.mapCode[i].indexOf(0) == -1){
                //Remove this Row
                this.mapCode.splice(i, 1);
                //Add another 0 row at the top of arraw
                this.mapCode.unshift([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
                //Update Score
                if(game.during <= 30 && game.during >= 20){
                    game.score += 10;
                }else if(game.during < 20 && game.during >= 10){
                    game.score += 20;
                }else{
                    game.score += 30;
                }
                
                //Render Web for Score
                document.getElementById("score").innerHTML = "Score : " + game.score;
                if(game.score % 100 == 0){
                    game.during -= 5 ;
                    if(game.during <= 0){
                        game.during = 1;
                    }
                }
                
            }
        }
    };
    Map.prototype.checkOver = function(){
        for(let i = 0;i<16 ; i++){
            if(this.mapCode[0][i] != 0){
                clearInterval(game.timer);
                alert("Game Over!Your Score is :" + game.score);
            }
        }
    }
})();