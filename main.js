

const mapContainer = document.querySelector(".mapContainer");

let objective;
let clickCounter;



// constructor for coordinates object, useful to easily and quickly define coordinates
class coordinates{
    constructor(){
        this.x;
        this.y;
    }
}


mapContainer.addEventListener('mousedown', e => {
    mapClick(e.target.id)
})

function mapClick(tileID){
    if(objective == undefined){
        defineObjective(tileID);
    }
    else if(tileID.match(/\d/g)[0] == objective.x && tileID.match(/\d/g)[1] == objective.y){
        undefineObjective(tileID);
    }
    else{
        console.log("Objective is already defined.")
    }
}

function defineObjective(tileID){
    document.getElementById(tileID).style.background = "#7dff7d";
    objective = new coordinates()
    objective.x = tileID.match(/\d/g)[0];
    objective.y = tileID.match(/\d/g)[1];
    console.log("New Objective =", objective);
}

function undefineObjective(tileID){
    document.getElementById("x"+objective.x+"y"+objective.y).style.background = "white";
    objective = undefined;
    console.log("Objective Deleted");
}