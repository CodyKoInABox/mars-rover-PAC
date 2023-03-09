

const mapContainer = document.querySelector(".mapContainer");

let objective;



// constructor for coordinates object, useful to easily and quickly define coordinates
class coordinates{
    constructor(){
        this.x;
        this.y;
    }
}


mapContainer.addEventListener('mousedown', e => {
    defineObjective(e.target.id)
})

function defineObjective(tileID){
    if(objective == undefined){
        document.getElementById(tileID).style.background = "#7dff7d";
        objective = new coordinates()
        objective.x = tileID.match(/\d/g)[0];
        objective.y = tileID.match(/\d/g)[1];
        console.log("New Objective =", objective);
    }
    else if(tileID.match(/\d/g)[0] == objective.x && tileID.match(/\d/g)[1] == objective.y){
        document.getElementById("x"+objective.x+"y"+objective.y).style.background = "white";
        objective = undefined;
        console.log("Objective Deleted");
    }
    else{
        console.log("Objective is already defined.")
    }
}