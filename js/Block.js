(function(){
    window.Block = function(){
        //get blocks' types and states randomly
        //List all kinds of types
        let allType = ["S","T","O","L","J","I","Z"];
        //Select one of the type in the list
        this.type = allType[parseInt(Math.random() * allType.length)];
        //Select the states randomly, and get the shape of this type
        this.allDir = blocks[this.type].length;
        this.dir = parseInt(Math.random() * this.allDir);

        //get the random selected block
        this.code = blocks[this.type][this.dir];

        //console.log(this.allDir);
        //console.log(this.dir);

        //console.log(this.type);
        this.block = [
            [0,1,1,0],
            [1,1,0,0],
            [0,0,0,0],
            [0,0,0,0]
        ]
        //Initial the row
        this.row = 0;
        //show the block in the center of the row
        this.col = 4;

    }
    Block.prototype.render = function(){
        //render the 4*4 blocks
        for(let i = 0;i<4;i++){
            for(let j = 0;j<4;j++){
                //if there's somewhere in the 4*4 block that is not 0, which means it should be rendered/colored 
                if(this.code[i][j] != 0){
                    game.setColor(i+this.row,j+this.col,this.code[i][j]);
                }
            }
        }
    };
    //Render Next Block(Preview Window)

    //Prejudge Process
    Block.prototype.check = function(row, col){
        //Check whether exists the situation that the color in the same position of blocks and map are both not 0, if there exits, return false, else return true
        for(let i = 0;i<4;i++){
            for (let j = 0;j<4;j++){
                if(this.code[i][j] != 0 && game.map.mapCode[i + row][j + col] != 0 ){
                    return false;
                }
            }
        }
        return true;
    };
    Block.prototype.checkDown = function(){
        if(this.check(this.row + 1, this.col)){
            this.row ++;
        }else{
            //Can't Move Down Any More, render new block
            game.block = game.nextBlock;
            game.nextBlock = new Block();
            this.renderMap();
            game.map.checkRemove();
            //Check whether the game is fail
            game.map.checkOver();
        }
    }
    //Render to the Map when the previous block is stopped
    Block.prototype.renderMap = function(){
        for(let i = 0;i<4;i++){
            for(let j = 0;j<4;j++){
                //Render to the Map according to the block
                if(this.code[i][j] != 0){
                    //Update the Map
                    game.map.mapCode[this.row + i][this.col + j] = this.code[i][j]
                }
            }
        }
    }

    //Check whether the block could move left
    Block.prototype.checkLeft = function(){
        if(this.check(this.row, this.col - 1)){
            this.col --;
        }
    };
    Block.prototype.checkRight = function(){
        if(this.check(this.row, this.col + 1)){
            this.col ++;
        }
    };
    Block.prototype.checkBlockEnd = function(){
        while(this.check(this.row + 1,this.col)){
            this.row ++;
        }
    };
    //Rotate of Block
    Block.prototype.checkRotate = function(){
        //Back up old shape and direction
        let oldDir = this.dir;
        //changing
        this.dir ++;
        if(this.dir > this.allDir - 1){
            this.dir = 0;
        }
        this.code = blocks[this.type][this.dir];
        //Check after-rendered block:whether could render
        if(!this.check(this.row, this.col)){
            //There exists Coincide part between changed block and map
            this.dir = oldDir;
            this.code = blocks[this.type][this.dir];
        }
    };
})()