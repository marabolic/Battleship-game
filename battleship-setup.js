



function setHeading(player){
    if (player==1){
        let p1Username = localStorage.getItem("player1Username");
        $("#headPlayer").html(p1Username);
    }
    if (player==2){
        let p2Username = localStorage.getItem("player2Username");
        $("#headPlayer").html(p2Username);
    }
}

function numOfBoats(){
    var sizeOne = 4;
    var sizeTwo = 3;
    var sizeThree = 2;
    var sizeFour = 1;

    
}

