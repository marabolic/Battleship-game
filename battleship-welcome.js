

function checkNames(){
    
    let Uplayer1 = $("#player1").val();
    let Uplayer2 = $("#player2").val();
    let usernameRegExp = /^\w{3,15}$/;
    if(!usernameRegExp.test(Uplayer1)){
        alert("invalid username for player1")
        return;
    }
    localStorage.setItem("player1Username", Uplayer1);

    if(!usernameRegExp.test(Uplayer2)){
        alert("invalid username for player2")
        return;
    }
    localStorage.setItem("player2Username", Uplayer2);
    
    window.open("./battleship-setup.html", "_self");


}