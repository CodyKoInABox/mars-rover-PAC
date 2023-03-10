// TODO LIST
// ADD COMMENTS
// DON'T FORGET
// !!!!!!!!!!!!

const mapContainer = document.querySelector(".mapContainer");

let objective;
let start;
let obstacles = [];




mapContainer.addEventListener('contextmenu', e => e.preventDefault());

mapContainer.addEventListener('mousedown', e => {
    mapClick(e.target.id);
})

//maybe change this to: left mouse = add / right mouse = remove (?)
function mapClick(tileID){
    console.log("Selected tile =", tileID)

    if(start == undefined){
        defineStart(tileID);
    }
    else if(start == tileID){
        undefineStart(tileID);
    }
    else if(objective == undefined){
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
     if(start == tileID){
        undefineStart(tileID);
     }
     else if (obstacles.includes(tileID)){
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

function defineStart(tileID){
    if(tileID == objective){
        undefineObjective(tileID);
    }
    else if(obstacles.includes(tileID)){
        undefineObstacles(tileID);
    }
    document.getElementById(tileID).style.background = "#ffa9f8";
    start = tileID;
    console.log("New Start =", start);
}

function undefineStart(tileID){
    document.getElementById(tileID).style.background = "white";
    start = undefined;
    console.log("Start Removed");
}

function buttonClick(){
    console.log("This button does nothing =)")
}