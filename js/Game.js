(function(){
    window.Game = function(){
        //Initial the 'Game' var
        //alert("Running Game");
        this.row = 20;
        this.col = 16;
        this.init();
        //Instantiate Blocks
        this.block = new Block();
        //Instantiate nect block
        this.nextBlock = new Block();

        //Instantiate Map
        this.map = new Map(this);

        //this.render();
        //Start timer
        this.start();
        //Event Listener
        this.bindEvent();
        
        //Set Score
        this.score= 0;
        //Set Speed
        this.during = 30;
    }
    //Initial the total background of Teris(including the table and the backgrund picture)
    Game.prototype.init = function(){
        var $table = $("<table></table");
        $table.addClass('Table1');
        for(let i = 0; i <this.row ;i++){
            var $tr = $("<tr></tr>");
            for(let j = 0;j<this.col;j++){
                var $td = $("<td></td>");
                $td.appendTo($tr);
            }
            $tr.appendTo($table); 
        }
        //Initial Preview Window
        let $table2 = $("<table></table");
        for(let i = 0;i<4;i++){
            let $tr2 = $("<tr></tr>");
            for(let j =0;j<4;j++){
                let $td2 = $("<td></td>");
                $td2.appendTo($tr2);
            }
            $tr2.appendTo($table2);
        }
        $("body").append($table);
        $("body").append($table2);
        $table2.addClass("Table2");
    }
    Game.prototype.setColor = function(row, col, num){
        //render color to which kind of blocks
        $(".Table1").find("tr").eq(row).children("td").eq(col).addClass("class" + num);
    };
    Game.prototype.setNextColor = function(){
        for(let i = 0;i<4;i++){
            for(let j = 0;j<4;j++){
                if(this.nextBlock.code[i][j] != 0){
                    $(".Table2").find("tr").eq(i).children("td").eq(j).addClass("class" + this.nextBlock.code[i][j]);
                }
            }
        }
        

    };
    Game.prototype.start = function(){
        let self = this;
        this.f = 0;
        this.timer = setInterval(function(){
            //Clear the Map
            self.f ++;
            self.clear();
            self.block.render();
            //render next block
            self.setNextColor();
            //render Map
            self.map.render(self);
            //Make Block Down
            self.f % self.during == 0 && self.block.checkDown();
        },20)
    }
    Game.prototype.clear = function(){
        for(let i = 0;i<this.row;i++){
            for(let j = 0;j<this.col;j++){
                $(".Table1").find("tr").eq(i).children("td").eq(j).removeClass();
            }
        }
        for(let i = 0;i<4;i++){
            for(let j = 0;j<4;j++){
                $(".Table2").find("tr").eq(i).children("td").eq(j).removeClass();
            }
        }

    }
    Game.prototype.bindEvent = function(){
        //Back up
        let self = this;
        $(document).keydown(function(event){
            //console.log(event.keyCode);
            if(event.keyCode == 37){
                //Left
                self.block.checkLeft();
            }else if(event.keyCode == 39){
                //Right
                self.block.checkRight();
            }else if(event.keyCode == 32){
                self.block.checkBlockEnd();
            }
            else if(event.keyCode == 38){
                //UP:rotate the block
                self.block.checkRotate();
            }
        })
    }
})()