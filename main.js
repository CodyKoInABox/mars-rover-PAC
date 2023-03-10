

const mapContainer = document.querySelector(".mapContainer");

let objective;
let obstacles = [];






mapContainer.addEventListener('mousedown', e => {
    mapClick(e.target.id)
})


function mapClick(tileID){
    console.log("tileID=", tileID)
    
    if(objective == undefined){
        defineObjective(tileID);
    }
    else if(tileID.match(/\d/g)[0] == objective.match(/\d/g)[0] && tileID.match(/\d/g)[1] == objective.match(/\d/g)[1]){
        undefineObjective();
    }
    else if (obstacles.includes(tileID)){
       undefineObstacles(tileID);
    }
    else{
        defineObstacles(tileID);
    }
}

function defineObjective(tileID){
    if (obstacles.includes(tileID)){
        undefineObstacles(tileID);
     }
    document.getElementById(tileID).style.background = "#7dff7d";
    objective = tileID;
    console.log("New Objective =", objective);
}

function undefineObjective(){
    document.getElementById("x"+objective.match(/\d/g)[0]+"y"+objective.match(/\d/g)[1]).style.background = "white";
    objective = undefined;
    console.log("Objective Removed");
}

function defineObstacles(tileID){
    document.getElementById(tileID).style.background = "#ff7d7d";
    obstacles.push(tileID);
    console.log("New Obstacle =", obstacles[obstacles.length-1]);
}

function undefineObstacles(tileID){
    document.getElementById(tileID).style.background = "white";
    obstacles.splice(obstacles.indexOf(tileID), 1);
    console.log("Obstacle Removed!")
}