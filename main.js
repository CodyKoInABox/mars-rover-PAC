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


//tile constructor
class tile{
    constructor(x, y, cameFromX, camefromY, gScore){
        //position on X axis
        this.x = parseInt(x),
        //position on Y axis
        this.y = parseInt(y),
        //div ID
        this.id = 'x' + parseInt(x) + 'y' + parseInt(y),
        //position of parent on X axis
        this.cameFromX = parseInt(cameFromX),
        //position of parent on Y axis
        this.cameFromY = parseInt(camefromY),
        //id of parent
        this.cameFromId = 'x' + parseInt(cameFromX) + 'y' + parseInt(camefromY);
        //h score
        this.hScore;
        //g score
        this.gScore = parseInt(gScore);
        //f score
        this.fScore;
    }
}

let startObj;
let objectiveObj;

//temporary function for the HTML button click, i'm just using this to test and figure out stuff, mainly about the A* pathfinder algorithm
function buttonClick(){


    //create tile object for start
    startObj = new tile(start.match(/\d/g)[0], start.match(/\d/g)[1]);  

    //create tile object for objective
    objectiveObj = new tile(objective.match(/\d/g)[0], objective.match(/\d/g)[1]);


    let distanceStartObjective = {
        x: (Math.max(startObj.x, objectiveObj.x) - Math.min(startObj.x, objectiveObj.x)),
        y: (Math.max(startObj.y, objectiveObj.y) - Math.min(startObj.y, objectiveObj.y)),
    }

    //manhattan distance
    let distance = distanceStartObjective.x + distanceStartObjective.y;

    console.log("Distance = ", distance);
    console.log("TALVEZ DE MUITO LAG AGORA");

          aStar();
    }


    let current;

    let tempColorValue = 30;

function aStar(){
    //list of nodes to check for neighbors
    let open = [];
    
    //list of nodes already checked for neighbors
    let closed = [];

    //add startObj to the open list
    open.push(startObj);

    //current node
    current = new tile();

    //g score
    let gScore = 0;
    
    //loop
    while(open.length > 0){

        //THIS IS THE BROKEN PART, IT KEEPS LOOPING WAYYYY TO MANY TIMES
        //it seems like having two obstacles on the path makes the open list increase in size non-stop
        //INCLUDE NEIGHBOR TEST INSIDE GET NEIGHBOR FUNCTION AND REMOVE IT FROM THE MAIN A* FUNCTION
        //it might help idk
        //current = node in open list with lowest f score
        current = open[0];
        for(let i = 1; i < open.length; i++){
            if(parseInt(open[i].fScore) < parseInt(current.fScore) || parseInt(open[i].fScore) == parseInt(current.fScore) && parseInt(open[i].hScore) < parseInt(current.hScore)){
                current = open[i];
                console.log("New Fscore =", current.fScore);
            }
            else{console.log("Old Fscore =", current.fScore);}
            console.log("Length of open list=", open.length);
        }

        //set the current g score
        current.gScore = gScore;

        //COLORS FOR TESTING
        try{
            let tempColor = 'hsl(240, 100%,' + tempColorValue + '%)'
            document.getElementById(current.id).style.background = tempColor;
            tempColorValue += 3;
        }
        catch(err){
            console.log(err);
        }
        
        



        //remove current from open
        open.splice(open.indexOf(current), 1);

        //add current to closed
        closed.push(current);

       if(current.x == objectiveObj.x && current.y == objectiveObj.y){
           //SUCESS
           console.log("SUCESS");
           return;
       }

        //will get all 4 neighbors to the current node
        getNeighbors(current);
        //will return only the valid neighbors
        // testNeighbors();
       //testing inside loop because the testNeighbors function isnt working

        //for each neighbour of current
        for(let j = 0; j < neighbors.length; j++){
            if(obstacles.includes(neighbors[j].id) || neighbors[j].x > 8 || neighbors[j].x <= 0 || neighbors[j].y > 8 || neighbors[j].y <= 0){
                continue; 
            }
            if(closed.includes(neighbors[j])){
                continue;
            }

            let movementCostToNeighbor = parseInt(current.gScore) + 1;
            if(movementCostToNeighbor < parseInt(neighbors.gScore) || !open.includes(neighbors[j])){
                neighbors[j].hScore = parseInt(manhattanDistance(neighbors[j], objectiveObj));
                neighbors[j].gScore = parseInt(movementCostToNeighbor);
                neighbors[j].fScore = parseInt(parseInt(neighbors[j].hScore) + parseInt(neighbors[j].gScore));
                neighbors[j].cameFromX = parseInt(current.x);
                neighbors[j].cameFromY = parseInt(current.y);
                neighbors[j].cameFromId = current.id;
                if(!open.includes(neighbors[j])){
                    open.push(neighbors[j]);
                }
            }
        }





        //add 1 to the gScore
        gScore++;
    }

}

let neighbors = [];

function getNeighbors(current){

    //neighbor below
    neighbors.push(new tile(current.x, parseInt(current.y)+1, current.x, current.y) );

    //neighbor above
    neighbors.push(new tile(current.x, parseInt(current.y)-1, current.x, current.y) );

    //neighbor to the right
    neighbors.push(new tile(parseInt(current.x)+1, current.y, current.x, current.y) );

    //neighbor to the left
    neighbors.push(new tile(parseInt(current.x)-1, current.y, current.x, current.y) );
}

//will return only valid neighbors
function testNeighbors(){
    let tempLength = neighbors.length
    let neighborsToSplice = [];
    for(let i=0; i < tempLength; i++){
        console.log("loop=", i)
        console.log(neighbors[i].x)
        //is neighbor is obstacle or outside the grid

        if(obstacles.includes(neighbors[i].id) || neighbors[i].x > 8 || neighbors[i].x <= 0 || neighbors[i].y > 8 || neighbors[i].y <= 0){
            console.log("splice")
        //    neighbors.splice(neighbors.indexOf(neighbors[i]));
              neighborsToSplice.push(i);
        }
    }
    //splice
    console.log(neighborsToSplice)
    for(let l = 0; l < neighborsToSplice.length; l++){
        console.log("spliceLOOP", l);
        if(l == 0){
            neighbors.splice(neighborsToSplice[l], 1);
        }
        else{
            neighbors.splice(neighborsToSplice[l - l - 1], 1);
        }
    }
}

//will return the manhattan distance between two nodes
function manhattanDistance(node1, node2){
    return (Math.max(parseInt(node1.x), parseInt(node2.x)) - Math.min(parseInt(node1.x), parseInt(node2.x))) + (Math.max(parseInt(node1.y), parseInt(node2.y)) - Math.min(parseInt(node1.y), parseInt(node2.y)))
}