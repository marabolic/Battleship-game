
var data = {
    player1: true,

    sizeOne: 4,
    sizeTwo: 3,
    sizeThree: 2,
    sizeFour: 1,

    sizeOneSunk: 0,
    sizeTwoSunk: 0,
    sizeThreeSunk: 0,
    sizeFourSunk: 0,

    shipsP1: {
        shipsOne: [[-1,-1], [-1,-1], [-1,-1], [-1,-1]],
        shipsTwo: [[-1,-1], [-1,-1], [-1,-1], [-1,-1], [-1,-1], [-1,-1]], 
        shipsThree: [[-1,-1], [-1,-1], [-1,-1], [-1,-1], [-1,-1],[-1,-1]],
        shipsFour: [[-1,-1], [-1,-1], [-1,-1], [-1,-1]]
    },

    shipsP2: {
        shipsOne: [[-1,-1], [-1,-1], [-1,-1], [-1,-1]],
        shipsTwo: [[-1,-1], [-1,-1], [-1,-1], [-1,-1], [-1,-1], [-1,-1]], 
        shipsThree: [[-1,-1], [-1,-1], [-1,-1], [-1,-1], [-1,-1],[-1,-1]],
        shipsFour: [[-1,-1], [-1,-1], [-1,-1], [-1,-1]]
    }
}


 $(document).ready(function(){
    var up = ""; 
    var down = "";
    $(".field").mousedown(function(){
        thisDown = $(this);
        down =  $(this).attr("id");
        //console.log("down " +  $(this).attr("id"));
        //JSON.parse("")
    })
    $(".field").mouseup(function(){
        thisUp = $(this);
        up =  $(this).attr("id");
        //console.log("up " +  $(this).attr("id"));
        if (data.player1){
            if (checkCoordinates(up, down, data.shipsP1)){
                colorAll(thisDown,thisUp);
                addAll(thisDown,thisUp, data.shipsP1);
                if  (data.sizeOneSunk == 4 && data.sizeTwoSunk == 3 
                    && data.sizeThreeSunk == 2 && data.sizeFourSunk == 1){
                        data.player1 = false;
                        
                        setPage(2);
                }
            }
        }
        else{
            if (checkCoordinates(up, down, data.shipsP2)){
                colorAll(thisDown,thisUp);
                addAll(thisDown,thisUp, data.shipsP2);
                if  (data.sizeOneSunk == 4 && data.sizeTwoSunk == 3 
                    && data.sizeThreeSunk == 2 && data.sizeFourSunk == 1){
                        var myJSON = JSON.stringify(data);
                        localStorage.setItem("data", myJSON);
                        window.open("./battleship-game.html", "_self");
                }
            }
        }
    })

 })

 function size(down,up){
    var length = 0;
    if (down.charAt(0) == up.charAt(0)){
        if(down.charAt(1) - up.charAt(1) >= 0){
            length = down.charAt(1) - up.charAt(1) + 1; 
        }
        else{
            length = up.charAt(1) - down.charAt(1) + 1;
        }

    }
    else{
        if (down.charAt(1) == up.charAt(1)){
            if(down.charAt(0) - up.charAt(0) >= 0){
                length = down.charAt(0) - up.charAt(0) + 1;
            }
            else{
                length = up.charAt(0) - down.charAt(0) + 1;
            }

        }
    }
    return length;
 }

 function addAll(thisDown,thisUp, player){ 
    var down = thisDown.attr("id");
    var up = thisUp.attr("id");
    var length = size(down, up);

    switch(length){
        case 1: 
            for(var i = 0; i < data.sizeOne; i++){
                if (player.shipsOne[i][0] == -1){
                    player.shipsOne[i] = [down.charAt(0), down.charAt(1)];
                    break;
                }
            }

            for(var i = 0; i < data.sizeOne; i++){
                console.log(player.shipsOne[i]);
            }
            break;
        case 2: 
            for(var i = 0; i < data.sizeTwo * 2; i++){
                if (player.shipsTwo[i][0] == -1){
                    player.shipsTwo[i] = [down.charAt(0), down.charAt(1)];
                    player.shipsTwo[i+1] = [up.charAt(0), up.charAt(1)];
                    break;
                }
            }
            for(var i = 0; i < data.sizeTwo * 2; i++){
                console.log(player.shipsTwo[i]);
            }
            break;
        case 3: 
            for(var i = 0; i < data.sizeThree * 3; i++){
                if (player.shipsThree[i][0] == -1){
                    player.shipsThree[i] = [down.charAt(0), down.charAt(1)];
                    if (down.charAt(0) == up.charAt(0) && down.charAt(1) - up.charAt(1) > 0){
                        player.shipsThree[i+1] = [down.charAt(0), parseInt(down.charAt(1)) - 1 + ""];
                    }
                    if (down.charAt(0) == up.charAt(0) && up.charAt(1) - down.charAt(1) > 0){
                        player.shipsThree[i+1] = [down.charAt(0), parseInt(down.charAt(1)) + 1 + ""];
                    }
                    if (down.charAt(1) == up.charAt(1) && down.charAt(0) - up.charAt(0) > 0){
                        player.shipsThree[i+1] = [parseInt(down.charAt(0)) - 1 + "", down.charAt(1)];
                    }
                    if (down.charAt(1) == up.charAt(1) && up.charAt(0) - down.charAt(0) > 0){
                        player.shipsThree[i+1] = [parseInt(down.charAt(0)) + 1 + "", down.charAt(1)];
                    }
                    player.shipsThree[i+2] = [up.charAt(0), up.charAt(1)];
                    break;
                }
            }
            for(var i = 0; i < data.sizeThree * 3; i++){
                console.log(player.shipsThree[i]);
            }
            break;
        case 4: 
            for(var i = 0; i < data.sizeFour; i++){
                if (player.shipsFour[i][0] == -1){
                    player.shipsFour[i] = [down.charAt(0), down.charAt(1)];
                    if (down.charAt(0) == up.charAt(0) && down.charAt(1) - up.charAt(1) > 0){
                        player.shipsFour[i+1] = [down.charAt(0), parseInt(down.charAt(1)) - 1 + ""];
                        player.shipsFour[i+2] = [down.charAt(0), parseInt(down.charAt(1)) - 2 + ""];
                    }
                    if (down.charAt(0) == up.charAt(0) && up.charAt(1) - down.charAt(1) > 0){
                        player.shipsFour[i+1] = [down.charAt(0), parseInt(down.charAt(1)) + 1 + ""];
                        player.shipsFour[i+2] = [down.charAt(0), parseInt(down.charAt(1)) + 2 + ""];
                    }
                    if (down.charAt(1) == up.charAt(1) && down.charAt(0) - up.charAt(0) > 0){
                        player.shipsFour[i+1] = [parseInt(down.charAt(0)) - 1 + "", down.charAt(1)];
                        player.shipsFour[i+2] = [parseInt(down.charAt(0)) - 2 + "", down.charAt(1)];
                    }
                    if (down.charAt(1) == up.charAt(1) && up.charAt(0) - down.charAt(0) > 0){
                        player.shipsFour[i+1] = [parseInt(down.charAt(0)) + 1 + "", down.charAt(1)];
                        player.shipsFour[i+2] = [parseInt(down.charAt(0)) + 2 + "", down.charAt(1)];
                    }
                    player.shipsFour[i+3] = [up.charAt(0), up.charAt(1)];
                    break;
                }
            }
            for(var i = 0; i < data.sizeFour * 4; i++){
                console.log(player.shipsFour[i]);
            }
            break;
    }



 }

 function colorAll(thisDown, thisUp){
    let down = thisDown.attr("id");
    let up = thisUp.attr("id");
    thisDown.css({
        "background-color" : "red"
    })
    thisUp.css({
        "background-color" : "red"
    })
    if (down.charAt(0) == up.charAt(0)){
        if (down.charAt(1) - up.charAt(1) >= 0){
            for(let i = up.charAt(1); i < down.charAt(1); i++){
                console.log(i);
                $("#"+ down.charAt(0) + i).css({
                    "background-color" : "red"
                })
            }
        }
        else{
            for(let i = down.charAt(1); i < up.charAt(1); i++){
                console.log(i);
                $("#"+ down.charAt(0) + i).css({
                    "background-color" : "red"
                })
            }
        }
    }
    else{
        if (down.charAt(0) - up.charAt(0) >= 0){
            for(let i = up.charAt(0); i < down.charAt(0); i++){
                console.log(i);
                $("#"+ i + down.charAt(1)).css({
                    "background-color" : "red"
                })
            }
        }
        else{
            for(let i = down.charAt(0); i < up.charAt(0); i++){
                console.log(i);
                $("#"+ i+ down.charAt(1)).css({
                    "background-color" : "red"
                })
            }
        }
    }

 }


 function checkCoordinates(up, down, player){ //check all fields between start and end
    if (up.charAt(0) != down.charAt(0) && up.charAt(1) != down.charAt(1)){
        alert("error");
        return false;
    }

    var ret;
    //from here
    if (down.charAt(0) == up.charAt(0)){
        if (down.charAt(1) - up.charAt(1) >= 0){
            for(let i = up.charAt(1); i <= down.charAt(1); i++){
                console.log("checking " + down.charAt(0) + "," + i);
                ret =  checkSurrounding(down.charAt(0), i, player);
                if (!ret){
                    return false;
                }
            }
        }
        else{
            for(let i = down.charAt(1); i <= up.charAt(1); i++){
                console.log("checking " + down.charAt(0) + "," + i);
                ret = checkSurrounding(down.charAt(0),i, player);
                if (!ret){
                    return false;
                }
            }
        }
    }
    else{
        if (down.charAt(0) - up.charAt(0) >= 0){
            for(let i = up.charAt(0); i <= down.charAt(0); i++){
                console.log("checking " + i + ", " + down.charAt(1));
                ret = checkSurrounding(i, down.charAt(1), player);
                if (!ret){
                    return false; 
                }
            }
        }
        else{
            for(let i = down.charAt(0); i <= up.charAt(0); i++){
                console.log("checking " + i + "," + down.charAt(1));
                ret = checkSurrounding(i, down.charAt(1), player);
                if (!ret){
                    return false;
                }
            }
        }
    }
    //to here
    
    if (!checkLength(up, down)){
        return false;
    }
    return true;
 }

function checkLength(up, down){

    var length = size(down, up);

    switch(length){
        case 1: 
                if(data.sizeOne - data.sizeOneSunk == 0){
                    console.log("no more size one ships");
                    return false;
                } 
                else{
                    data.sizeOneSunk++;
                    numOfBoats();
                }
                break;
        case 2: 
                if(data.sizeTwo - data.sizeTwoSunk == 0){
                    console.log("no more size two ships");
                    return false;
                } 
                else{
                    data.sizeTwoSunk++;
                    numOfBoats();
                }
                break;
        case 3: 
                if(data.sizeThree - data.sizeThreeSunk == 0){
                    console.log("no more size three ships");
                    return false;
                } 
                else{
                    data.sizeThreeSunk++;
                    numOfBoats();
                }
                break;
        case 4: 
                if(data.sizeFour - data.sizeFourSunk == 0){
                    console.log("no more size four ships");
                    return false;
                } 
                else{
                    data.sizeFourSunk++;
                    numOfBoats();
                }
                break;
        default:
            alert("error size");
            return false;
    }
    return true;
 }

 function checkSurrounding(row, column, player){

    let res1 = check(row, column, data.sizeOne, player.shipsOne);
    console.log(res1);
    let res2 = check(row, column, data.sizeTwo * 2, player.shipsTwo); 
    console.log(res2);
    let res3 = check(row, column, data.sizeThree * 3, player.shipsThree);
    console.log(res3);
    let res4 = check(row, column, data.sizeFour * 4, player.shipsFour);
    console.log(res4);

    if (res1 & res2 & res3 & res4){
        return true;
    }
    else{
        return false;
    }
 }

 function check(row, column, size, ships){
    var r = parseInt(row);
    var c = parseInt(column);
    for(var i = 0; i < size; i++){
        if(r == ships[i][0] && c == ships[i][1]){
            return false;
        }
        if(r - 1 == ships[i][0] && c == ships[i][1]){
            return false;
        }
        if(r + 1 == ships[i][0] && c == ships[i][1]){
            return false;
        }
        if(r == ships[i][0] && c - 1 == ships[i][1]){
            return false;
        }
        if(r == ships[i][0] && c + 1 == ships[i][1]){
            return false;
        }
        if(r + 1 == ships[i][0] && c - 1 == ships[i][1]){
            return false;
        }
        if(r - 1 == ships[i][0] && c - 1 == ships[i][1]){
            return false;
        }
        if (r + 1 == ships[i][0] && c + 1 == ships[i][1]){
            return false;
        }
        if(r - 1 == ships[i][0] && c + 1 == ships[i][1]){
            return false;
        }
    }
    return true;
 }


function setPage(player){
    if (player==1){
        let p1Username= localStorage.getItem("player1Username");
        $("#headPlayer").html(p1Username);
    }
    if (player==2){
        let p2Username = localStorage.getItem("player2Username");
        $("#headPlayer").html(p2Username);
    }
    data.sizeFourSunk = 0;
    data.sizeThreeSunk = 0;
    data.sizeTwoSunk = 0;
    data.sizeOneSunk = 0;

    numOfBoats();
    $(".field").each(function(){
        $(this).css({
            "background-color" : "palegoldenrod"
        })
    })
}

function numOfBoats(){
    $("#sizeOne").html("" + data.sizeOne - data.sizeOneSunk);
    $("#sizeTwo").html("" + data.sizeTwo - data.sizeTwoSunk);
    $("#sizeThree").html("" + data.sizeThree - data.sizeThreeSunk);
    $("#sizeFour").html("" + data.sizeFour - data.sizeFourSunk);
}





