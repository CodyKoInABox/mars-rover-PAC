

const mapContainer = document.querySelector(".mapContainer");

let objective;
let obstacles = [];
let obstaclesID = [];



// constructor for coordinates object, useful to easily and quickly define coordinates
class coordinates{
    constructor(){
        this.x;
        this.y;
        this.ID;
    }
}


mapContainer.addEventListener('mousedown', e => {
    mapClick(e.target.id)
})


function mapClick(tileID){
    console.log("tileID=", tileID)
    
    if(objective == undefined){
        defineObjective(tileID);
    }
    else if(tileID.match(/\d/g)[0] == objective.x && tileID.match(/\d/g)[1] == objective.y){
        undefineObjective();
    }
    else if (obstaclesID.includes(tileID)){
       undefineObstacles(tileID);
    }
    else{
        defineObstacles(tileID);
    }
}

function defineObjective(tileID){
    if (obstaclesID.includes(tileID)){
        undefineObstacles(tileID);
     }
    document.getElementById(tileID).style.background = "#7dff7d";
    objective = new coordinates()
    objective.x = tileID.match(/\d/g)[0];
    objective.y = tileID.match(/\d/g)[1];
    objective.ID = tileID;
    console.log("New Objective =", objective);
}

function undefineObjective(){
    document.getElementById("x"+objective.x+"y"+objective.y).style.background = "white";
    objective = undefined;
    console.log("Objective Removed");
}

function defineObstacles(tileID){
    document.getElementById(tileID).style.background = "#ff7d7d";
    obstacles.push(new coordinates());
    obstacles[obstacles.length-1].x = tileID.match(/\d/g)[0];
    obstacles[obstacles.length-1].y = tileID.match(/\d/g)[1];
    obstacles[obstacles.length-1].ID = tileID;
    obstaclesID.push(tileID);
    console.log("New Obstacle =", obstacles[obstacles.length-1]);
}

function undefineObstacles(tileID){
    document.getElementById(tileID).style.background = "white";
    obstacles.splice(obstacles.findIndex(e=> e.ID == tileID), 1);
    obstaclesID.splice(obstaclesID.indexOf(tileID), 1);
    console.log("Obstacle Removed!")
}