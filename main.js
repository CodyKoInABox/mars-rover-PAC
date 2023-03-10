// TODO LIST
// translate the comments ?
// add more coments

//set a const for the mapContainer (mapContainer = full 8x8 grid)
const mapContainer = document.querySelector(".mapContainer");

//set global variables

//objective is a string with the objective ID
let objective;
//start is a string with the start ID
let start;
//obstacles is an array with all obstacles ID
let obstacles = [];



//stop right mouse click from opening the browser's context menu when clicking inside the grid
mapContainer.addEventListener('contextmenu', e => e.preventDefault());

//detect clicks inside the grid
//i'm using mousedown instead of click because click bugs when the mouse is moving fast
mapContainer.addEventListener('mousedown', e => {
    //call the mapClick function and pass the ID of the tile that was clicked
    mapClick(e.target.id);
})


//maybe change this to: left mouse = add / right mouse = remove (?)
//this is just a "main" function for the grid, it organizes the calling of other functions to draw and erase the start, objective and obstacles
function mapClick(tileID){
    //log the ID of the tile that was clicked
    console.log("Selected tile =", tileID)

    //if there's no start, the click will define a start
    if(start == undefined){
        defineStart(tileID);
    }
    //else, if there's already a start and you click it, the click will remove the start
    else if(start == tileID){
        undefineStart(tileID);
    }
    //else, if there's no objective, the click will define a start
    else if(objective == undefined){
        defineObjective(tileID);
    }
    //else, if there's already an objective and you click it, the click will remove the objective
    else if(objective == tileID){
        undefineObjective();
    }
    //else, if you click an obstacle, remove the obstacle (check next else for explanation on obstacles)
    else if (obstacles.includes(tileID)){
       undefineObstacles(tileID);
    }
    //else, if there's already a start and an objective, the clicks will add obstacles, there's no limit for how many of these can exist
    else{
        defineObstacles(tileID);
    }
}

// i should probably sort these functions in the same order as the if/else above !!

//function that adds an objective
function defineObjective(tileID){
    //the if else is here to make sure the order: Start -> Objective -> Obstacles is followed.
    //if the clicked tile is the start tile, remove the start
     if(start == tileID){
        undefineStart(tileID);
     }
     //else, if the clicked tile is an obstacle, remove that obstacle
     else if (obstacles.includes(tileID)){
        undefineObstacles(tileID);
     }
     //after removing (or not) whatever was on the way, run the code:
     //get the clicked tile and make it green as it is now the objective
    document.getElementById(tileID).style.background = "#7dff7d";
    //set the objective variable to the clicked tile's ID
    objective = tileID;
    //log that an objective was created and it's ID
    console.log("New Objective =", objective);
}

//function that removes the objective
function undefineObjective(){
    //get the objective's tile and make it white
    document.getElementById("x"+objective.match(/\d/g)[0]+"y"+objective.match(/\d/g)[1]).style.background = "white";
    //set the objective varible as undefined
    objective = undefined;
    //log that the objective was removed
    console.log("Objective Removed");
}

//function that adds obstacles
function defineObstacles(tileID){
    //get the selected tile and make it red as it is now an obstacle
    document.getElementById(tileID).style.background = "#ff7d7d";
    //push the ID of the new obstacle to the obstacles array
    obstacles.push(tileID);
    //log that a new obstacle was created and it's ID
    console.log("New Obstacle =", obstacles[obstacles.length-1]);
}

//function that removes obstacles
function undefineObstacles(tileID){
    //get the obstacle's tile and make it white
    document.getElementById(tileID).style.background = "white";
    //remove (splice) that one obstacle from the obstacles array
    //the indexOf will return the index of the value I'm looking for inside an array, in this case, i'm looking for the tileID value
    obstacles.splice(obstacles.indexOf(tileID), 1);
    //log that an obstacle was removed
    console.log("Obstacle Removed!")
}

//function that adds a start
function defineStart(tileID){
    //the if else is here to make sure the order: Start -> Objective -> Obstacles is followed.
    //if the clicked tile is the objective tile, remove the objective
    if(tileID == objective){
        undefineObjective(tileID);
    }
    //else, if the clicked tile is an obstacle, remove that obstacle
    else if(obstacles.includes(tileID)){
        undefineObstacles(tileID);
    }
    //after removing (or not) whatever was on the way, run the code:
    //get the clicked tile and make it pink as it is now the start
    document.getElementById(tileID).style.background = "#ffa9f8";
    //set the start variable to the clicked tile's ID
    start = tileID;
    //log that a start was created, and it's ID
    console.log("New Start =", start);
}

//function that removes the start
function undefineStart(tileID){
    //get the start's tile and make it white
    document.getElementById(tileID).style.background = "white";
    //set the variable start as undefined
    start = undefined;
    //log that the start was removed
    console.log("Start Removed");
}


//temporary function for the HTML button click, i'm just using this to test and figure out stuff, mainly about the A* pathfinder algorithm
function buttonClick(){
   

    try{
    //pretty much the H score
    let startObj = {
        x: start.match(/\d/g)[0],
        y: start.match(/\d/g)[1]
    }
    let objectiveObj = {
        x: objective.match(/\d/g)[0],
        y: objective.match(/\d/g)[1]
    }
    let distanceStartObjective = {
        x: (Math.max(startObj.x, objectiveObj.x) - Math.min(startObj.x, objectiveObj.x)),
        y: (Math.max(startObj.y, objectiveObj.y) - Math.min(startObj.y, objectiveObj.y)),
    }

    let distance = Math.sqrt(Math.pow(distanceStartObjective.x, 2) + Math.pow(distanceStartObjective.y, 2));

    console.log("Distance = ", distance);
    }
    catch(err){
        console.log("ERROR: Start and Objetive are not defined");
        //console.log(err);
    }
}