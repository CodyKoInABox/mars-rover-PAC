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

mapContainer.addEventListener('mouseover', e =>{
    document.getElementById("currentTile").innerHTML = "(" + e.target.id.match(/\d/g)[0] + ", " + e.target.id.match(/\d/g)[1] + ")";
    document.getElementById("subtitle").innerHTML = "(X, Y)";
    if(e.target.id == start){
        document.getElementById("currentTile").style.color = "#ffa9f8";
    }
    else if(e.target.id == objective){
        document.getElementById("currentTile").style.color = "#7dff7d";
    }
    else if(obstacles.includes(e.target.id)){
        document.getElementById("currentTile").style.color = "#ff7d7d";
    }
    else if(globalPath.includes(e.target.id)){
        document.getElementById("currentTile").style.color = "aqua";
    }
    else{
        document.getElementById("currentTile").style.color = "white";
    }
})

mapContainer.addEventListener('mouseout', () =>{
    document.getElementById("currentTile").innerHTML = "&zwnj;";
    document.getElementById("subtitle").innerHTML = "&zwnj;";
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
    //change the HTML text to display the objective
    document.getElementById("objective").innerHTML = "Ponto final: (" + objective.match(/\d/g)[0] + ", " + objective.match(/\d/g)[1] + ")";
}

//function that removes the objective
function undefineObjective(){
    //get the objective's tile and make it white
    document.getElementById("x"+objective.match(/\d/g)[0]+"y"+objective.match(/\d/g)[1]).style.background = "white";
    //set the objective varible as undefined
    objective = undefined;
    //log that the objective was removed
    console.log("Objective Removed");
    //change the HTML text to stop displaying the objective
    document.getElementById("objective").innerHTML = "Ponto final: "
}

//function that adds obstacles
function defineObstacles(tileID){
    //get the selected tile and make it red as it is now an obstacle
    document.getElementById(tileID).style.background = "#ff7d7d";
    //push the ID of the new obstacle to the obstacles array
    obstacles.push(tileID);
    //log that a new obstacle was created and it's ID
    console.log("New Obstacle =", obstacles[obstacles.length-1]);
    //change the HTML text to display all current obstacles
    document.getElementById("obstacles").innerHTML = "Obstaculos: ";
    for(let i = 0; i < obstacles.length; i++){
        document.getElementById("obstacles").innerHTML += "  (" + obstacles[i].match(/\d/g)[0] + ", " + obstacles[i].match(/\d/g)[1] + ") ";
}
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
    //change the HTML text to display all current obstacles
    document.getElementById("obstacles").innerHTML = "Obstaculos: ";
        for(let i = 0; i < obstacles.length; i++){
                document.getElementById("obstacles").innerHTML += "  (" + obstacles[i].match(/\d/g)[0] + ", " + obstacles[i].match(/\d/g)[1] + ") ";
        }
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
    //change the HTML text to display the start
    document.getElementById("start").innerHTML = "Ponto inicial: (" + start.match(/\d/g)[0] + ", " + start.match(/\d/g)[1] + ")";
}

//function that removes the start
function undefineStart(tileID){
    //get the start's tile and make it white
    document.getElementById(tileID).style.background = "white";
    //set the variable start as undefined
    start = undefined;
    //log that the start was removed
    console.log("Start Removed");
    //change the HTML text to stop showing the start
    document.getElementById("start").innerHTML = "Ponto inicial: "
}

//constructor for the Node object
//REMEMBER TO ALWAYS PASS A GSCORE AND HSCORE WHEN CREATING AN OBJECT
class Node {
    constructor(x, y, camefromX, cameFromY, gScore, hScore, parent) {
        this.x = x;
        this.y = y;
        this.id = "x" + x + "y" + y;
        this.camefromX = camefromX;
        this.cameFromY = cameFromY;
        this.cameFromId = "x" + camefromX + "y" + cameFromY;
        this.gScore = gScore;
        this.hScore = hScore;
        this.fScore = gScore + hScore;
        this.parent = parent;
    }
}



//temporary function for the HTML button click, i'm just using this to test and figure out stuff, mainly about the A* pathfinder algorithm
function buttonClick(){

    aStar();

}


//A* pathfinding algorithm
function aStar(){


    //create a current node;
    let current = new Node;

    //create a node object for the objective position 
    let objectiveObj = new Node(parseInt(objective.match(/\d/g)[0]), parseInt(objective.match(/\d/g)[1]));

    //create a node object for the start position
    let startObj = new Node(parseInt(start.match(/\d/g)[0]), parseInt(start.match(/\d/g)[1]), undefined, undefined, 0, getManhattanDistance(parseInt(start.match(/\d/g)[0]), parseInt(start.match(/\d/g)[1]), objectiveObj.x, objectiveObj.y));
    

    //create the open set
    let open = [];
    
    //create the closed set
    let closed = [];

    //add the start node to open
    open.push(startObj);

    let i = 0;
    while(open.length > 0 && i < 500){

        //if objective can't be reached in 500 tries
        if(i == 499){
            window.alert("Nao existem caminhos disponiveis.");
        }
        
        //find node in the open set with the lowest f score
        current = open[0];
        for(let i = 1; i < open.length; i++){
            if(open[i].fScore < current.fScore || open[i].fScore == current.fScore && open[i].gScore < current.gScore){
                current = open[i];
            }
        }


        open.splice(open.indexOf(current), 1);
        closed.push(current);

        if(current.id == objective){
            path = retracePath(startObj, closed[closed.length-1]);
            drawPath(path);
            return;
        }

    

        let neighbors = getNeighbors(current, objectiveObj);
        
        //for each neighbor
        for(let j = 0; j < neighbors.length; j++){
            //if neighbor is in the closed set, skip it
            if(closed.includes(neighbors[j])){
                continue;
            }

            let newGScore = current.gScore + 1;
            let newHScore = getManhattanDistance(neighbors[j].x, neighbors[j].y, objectiveObj.x, objectiveObj.y);

            if(newGScore < neighbors[j].gScore || !open.includes(neighbors[j])){
                neighbors[j].gScore = newGScore;
                neighbors[j].hScore = newHScore;
                neighbors[j].fScore = newGScore + newHScore;

                //if neighbor is NOT in the open set, add it to it
                //looks like this is the broken part
                let currentNeighbor = neighbors[j];
                
                
                
                

                if(open.some(open => open.id == currentNeighbor.id) == true){  
                }
                else{  
                    open.push(currentNeighbor);
                }
            }
        }
        i++;
    }
}

//function that returns the manhattan distance between two nodes, using the x and y values from each as inputs
function getManhattanDistance(firstX, firstY, secondX, secondY){
    return (Math.max(firstX, secondX) - Math.min(firstX, secondX)) + (Math.max(firstY, secondY) - Math.min(firstY, secondY))
}

//function that returns all valid neighbors for a node, including their g, h and f scores
function getNeighbors(current, objectiveObj){
    let neighbors = [];
    //get neighbor top
    let neighborTop = new Node(current.x, current.y-1, current.x, current.y, current.gScore+1, getManhattanDistance(current.x, current.y-1, objectiveObj.x, objectiveObj.y), current);
    if(testNeighbor(neighborTop) == 1){
        neighbors.push(neighborTop);
    }

    //get neighbor botton
    let neighborBottom = new Node(current.x, current.y+1, current.x, current.y, current.gScore+1, getManhattanDistance(current.x, current.y+1, objectiveObj.x, objectiveObj.y), current);
    if(testNeighbor(neighborBottom) == 1){
        neighbors.push(neighborBottom);
    }

    //get neighbor right
    let neighborRight = new Node(current.x+1, current.y, current.x, current.y, current.gScore+1, getManhattanDistance(current.x+1, current.y, objectiveObj.x, objectiveObj.y), current);
    if(testNeighbor(neighborRight) == 1){
        neighbors.push(neighborRight);
    }

    //get neighbor left
    let neighborLeft = new Node(current.x-1, current.y, current.x, current.y, current.gScore+1, getManhattanDistance(current.x-1, current.y, objectiveObj.x, objectiveObj.y), current);
    if(testNeighbor(neighborLeft) == 1){
        neighbors.push(neighborLeft);
    }

    return neighbors;
}

//function that tests if a neighbor is valid, both for if it is inside the grid and if it is an obstacle
function testNeighbor(neighbor){

    //test if neighbor is inside the grid
    if(neighbor.x < 9 && neighbor.x > 0 && neighbor.y < 9 && neighbor.y > 0){
        //test if neighbor is obstacle
        if(obstacles.includes(neighbor.id)){
            return 0;
        }
        else{
            return 1;
        }
    }
    else{
        return 0;
    }
}

let globalPath = [];

function retracePath(startNode, endNode){
    let path = [];

    let currentNode = endNode;

    
    
    while(currentNode.id != startNode.id){
        path.push(currentNode.id);
        currentNode = currentNode.parent;  
    }

    globalPath = path;
    return path;
}

function drawPath(path){
    for(let i = 1; i < path.length; i++){
        document.getElementById(path[i]).style.background = "aqua";
    }
}