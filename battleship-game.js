
var player = {
    p : 1,
    winner: -1
}

var cnt = {
    cntP1 : {
        cntTwo: [2,2,2],
        cntThree: [3,3],
        cntFour: [4],
        total: 0
    },

    cntP2 : {
        cntTwo: [2,2,2],
        cntThree: [3,3],
        cntFour: [4],
        total: 0
    },
}
 var sunkShips = {
    sunkP1: [[-1,-1], [-1,-1], [-1,-1], [-1,-1], [-1,-1], [-1,-1], [-1,-1], [-1,-1], [-1,-1], 
            [-1,-1], [-1,-1], [-1,-1], [-1,-1], [-1,-1], [-1,-1], [-1,-1], [-1,-1], [-1,-1],
            [-1,-1], [-1,-1]],
    sunkP2: [[-1,-1], [-1,-1], [-1,-1], [-1,-1], [-1,-1], [-1,-1], [-1,-1], [-1,-1], [-1,-1], 
            [-1,-1], [-1,-1], [-1,-1], [-1,-1], [-1,-1], [-1,-1], [-1,-1], [-1,-1], [-1,-1],
            [-1,-1], [-1,-1]]
}




$(document).ready(function(){
    
    var myJSON = localStorage.getItem("data");
    var data = JSON.parse(myJSON);
    

    
    $(".field2").click(function(){
        if(player.p == 0){
            let thisField = $(this);
            let fieldID = thisField.attr("id");
            
            let found = checkField(thisField, fieldID, data.shipsP2, cnt.cntP2, "a", sunkShips.sunkP1);
            if (!found){
                setup(data.shipsP1, cnt.cntP1, "", "palegoldenrod", sunkShips.sunkP2);
                alert("menja se igrac");
                player.p = 1;
                setup(data.shipsP2, cnt.cntP2, "a", "red", sunkShips.sunkP1);
            }
        }
    })
       
    $(".field1").click(function(){
        if(player.p == 1){
            let thisField = $(this);
            let fieldID = thisField.attr("id");
            
            let found = checkField(thisField, fieldID, data.shipsP1, cnt.cntP1, "", sunkShips.sunkP2);
            if (!found){
                setup(data.shipsP2, cnt.cntP2, "a", "palegoldenrod", sunkShips.sunkP1); //sakriva moje tajne
                alert("menja se igrac");
                player.p = 0;
                setup(data.shipsP1, cnt.cntP1, "", "red", sunkShips.sunkP2); //prikazi ovom drugom njegove tajne
            }
        }
    })
 })


function addSunk(id, sunk, c){
    for(var i = 0; i < 20; i++){
        if (sunk[i][0] == -1){
            sunk[i] = [id.charAt(0), id.charAt(1)];
            break;
        }
    }
    
    c.total++;
    if (c.total == 20){
        winner = player.p;
        if (player.p == 1){
            alert("player 1: 20" + "    player 2:" + cnt.cntP2.total);
        }
        else{
            alert("player 1: " + cnt.cntP1.total +  "    player 2: 20" );
        }
        window.open("./battleship-welcome.html", "_self");
    }
    
}


 function checkField(field, id, data, cnt, ext, sunk){
    var ret = color(field, id, data.shipsOne); 
    if (ret >= 0){
        addSunk(id, sunk, cnt)
        field.css({
            "background-color" : "green"
        })
        return true;
    }
    ret = color(field, id, data.shipsTwo);
    if (ret >= 0){
        addSunk(id, sunk, cnt);
        if (ret < 2){
            shipSunk(cnt.cntTwo, 0, data.shipsTwo, ext, 0, 2, true);
        }
        else{
            if (ret < 4){
                shipSunk(cnt.cntTwo, 1, data.shipsTwo, ext, 2, 4, true);
            }
            else{
                shipSunk(cnt.cntTwo, 2, data.shipsTwo, ext, 4, 6, true);
            }
        }
        return true;
    }

    ret = color(field, id, data.shipsThree);
    if (ret >= 0){
        addSunk(id, sunk, cnt);
        if (ret < 3){
            shipSunk(cnt.cntThree, 0, data.shipsThree, ext, 0, 3, true);
        }
        else{
            shipSunk(cnt.cntThree, 1, data.shipsThree, ext, 3, 6, true);
        }
        return true;
    }

    ret = color(field, id, data.shipsFour);
    if (ret >= 0){
        addSunk(id, sunk, cnt);
        shipSunk(cnt.cntFour, 0, data.shipsFour, ext, 0, 4, true);
        
        return true;
    }

    field.css({
        "background-color" : "slategray"
    })
    return false;
    
}

function shipSunk(cnt, ind, ships, ext, downVal, upVal, decrement){
    if (decrement){
        cnt[ind]--;
    }
    if (cnt[ind] == 0){
        var i = 0;
        for(key in ships){
            if (i >= downVal && i < upVal){
                $("#" + ships[key][0] + ships[key][1] + ext).css({
                    "background-color" : "green"
                })
            }
            i++;
        }
    }
}


function setup(data, cnt, ext, color, sunk){
    draw(data.shipsOne, ext, color);
    draw(data.shipsTwo, ext, color);
    draw(data.shipsThree, ext, color);
    draw(data.shipsFour, ext, color);

    
    for (key in sunk){
        var id = sunk[key][0] + sunk[key][1] + "";

        var ret = index(id, data.shipsOne); //brod 1 
        if (ret >= 0){
            $("#" + id + ext).css({
                "background-color" : "green"
            })
            continue;
        }


        ret = index(id, data.shipsTwo); //brod 2
        if (ret >= 0){
            $("#" + id + ext).css({
            "background-color" : "blue"
            })
            if (ret < 2){
                shipSunk(cnt.cntTwo, 0, data.shipsTwo, ext, 0, 2, false);
            }
            else{
                if (ret < 4){
                    shipSunk(cnt.cntTwo, 1, data.shipsTwo, ext, 2, 4, false);
                }
                else{
                    shipSunk(cnt.cntTwo, 2, data.shipsTwo, ext, 4, 6, false);
                }
            }
            continue;
        }


        ret = index(id, data.shipsThree); //brod 3
        if (ret >= 0){
            $("#" + id + ext).css({
                "background-color" : "blue"
            })
            if (ret < 3){
                shipSunk(cnt.cntThree, 0, data.shipsThree, ext, 0, 3, false);
            }
            else{
                shipSunk(cnt.cntThree, 1, data.shipsThree, ext, 3, 6, false);
            }
            continue;
        }

        ret = index(id, data.shipsFour); //brod 4
        if (ret >= 0){
            $("#" + id + ext).css({
                "background-color" : "blue"
            })
            shipSunk(cnt.cntFour, 0, data.shipsFour, ext, 0, 4, false);
            continue;
        }

        
        
    }
}

function draw(data, ext, color){
    for (key in data){
        $("#" + data[key][0] + data[key][1] + ext).css({
            "background-color" : color
        })
    }
}


 function color(field, id, data){
    var i = 0;
    for(key in data){
        if (id.charAt(0) == data[key][0] && id.charAt(1) == data[key][1]){
            field.css({
                "background-color" : "blue"
            })
            return i;
        }
        i++;
    }
    return -1;
 }

 function index(id, data){
    var i = 0;
    for(key in data){
        if (id.charAt(0) == data[key][0] && id.charAt(1) == data[key][1]){
            return i;
        }
        i++;
    }
    return -1;
 }




function setPage(){
    let p1Username= localStorage.getItem("player1Username");
    $("#headPlayer1").html(p1Username);

    let p2Username = localStorage.getItem("player2Username");
    $("#headPlayer2").html(p2Username);
    
}