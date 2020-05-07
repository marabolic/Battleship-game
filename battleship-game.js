
$(document).ready(function(){
   
    $(".field").click(function(){
        let thisField = $(this);
        let fieldID = thisField.attr("id");
        var myJSON = localStorage.getItem("data");
        var data = JSON.parse(myJSON);
        for(key in data){
            if(key == "sizeTwo"){
                console.log("data[key]: " + data[key]);
            }
        }

        
    })

 })




 function boatSunk(row, column){
    
 }


function setPage(){
    let p1Username= localStorage.getItem("player1Username");
    $("#headPlayer1").html(p1Username);

    let p2Username = localStorage.getItem("player2Username");
    $("#headPlayer2").html(p2Username);
    
}