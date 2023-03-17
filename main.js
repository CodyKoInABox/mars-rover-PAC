// TODO LIST
// translate the comments (?)
// add more comments
// organize everything
// make the open set a heap

// to whoever is reading this:
// the code is very messy and lacking some comments but I believe in you, good luck =)
// it's also not really optimized, but i'll fix that later

//set a const for the mapContainer (mapContainer = full 8x8 grid)
const mapContainer = document.querySelector(".mapContainer");

const clickText = document.getElementById("clickText");

//set global variables

//objective is a string with the objective ID
let objective;
//start is a string with the start ID
let start;
//obstacles is an array with all obstacles ID
let obstacles = [];

//bool that controls if images are shown or not
let showImages = false;

let firstClick = true;

updateSwitch()

//stop right mouse click from opening the browser's context menu when clicking inside the grid
mapContainer.addEventListener('contextmenu', e => e.preventDefault());

//detect clicks inside the grid
//i'm using mousedown instead of click because click bugs when the mouse is moving fast
mapContainer.addEventListener('mousedown', e => {
    //call the mapClick function and pass the ID of the tile that was clicked
    mapClick(e.target.id);
    changeStatsColors(e);
})

mapContainer.addEventListener('mouseover', e =>{
    document.getElementById("currentTile").innerHTML = "(" + e.target.id.match(/\d/g)[0] + ", " + e.target.id.match(/\d/g)[1] + ")";
    document.getElementById("subtitle").innerHTML = "(X, Y)";
    changeStatsColors(e);
})

mapContainer.addEventListener('mouseout', () =>{
    document.getElementById("currentTile").innerHTML = "&zwnj;";
    document.getElementById("subtitle").innerHTML = "&zwnj;";
})

function changeStatsColors(e){
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
}

clickText.innerHTML = 'Clique para adicionar um ponto inicial <span style="color:#ffa9f8">&#9724</span>';

//maybe change this to: left mouse = add / right mouse = remove (?)
//this is just a "main" function for the grid, it organizes the calling of other functions to draw and erase the start, objective and obstacles
function mapClick(tileID){
    //log the ID of the tile that was clicked
    console.log("Selected tile =", tileID)

    //if there's no start, the click will define a start
    if(start == undefined){
        defineStart(tileID);
        if(objective == undefined){
            clickText.innerHTML = 'Clique para adicionar um objetivo <span style="color:#7dff7d">&#9724</span>'
    }
    else{
        clickText.innerHTML = 'Clique para adicionar um obstaculo <span style="color:#ff7d7d">&#9724</span>'
    }
    }
    //else, if there's already a start and you click it, the click will remove the start
    else if(start == tileID){
        undefineStart(tileID);
        clickText.innerHTML = 'Clique para adicionar um ponto inicial <span style="color:#ffa9f8">&#9724</span>'
    }
    //else, if there's no objective, the click will define a start
    else if(objective == undefined){
        defineObjective(tileID);
        clickText.innerHTML = 'Clique para adicionar um obstaculo <span style="color:#ff7d7d">&#9724</span>'
    }
    //else, if there's already an objective and you click it, the click will remove the objective
    else if(objective == tileID){
        undefineObjective();
        clickText.innerHTML = 'Clique para adicionar um objetivo <span style="color:#7dff7d">&#9724</span>'
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
     if(showImages == true){
        document.getElementById(tileID).style.backgroundImage = "url(assets/flagTile.png)";
        document.getElementById(tileID).style.backgroundSize = "100%";
        document.getElementById(tileID).style.transform = "rotate(0deg)";
    }
    else{
        document.getElementById(tileID).style.background = "#7dff7d";
    }
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

    //push the ID of the new obstacle to the obstacles array
    obstacles.push(tileID);
    //log that a new obstacle was created and it's ID
    console.log("New Obstacle =", obstacles[obstacles.length-1]);
    //change the HTML text to display all current obstacles
    document.getElementById("obstacles").innerHTML = "Obstaculos: ";
    for(let i = 0; i < obstacles.length; i++){
        document.getElementById("obstacles").innerHTML += "  (" + obstacles[i].match(/\d/g)[0] + ", " + obstacles[i].match(/\d/g)[1] + ") ";
}
    //get the selected tile and make it red as it is now an obstacle
    
    if(showImages == true){
        document.getElementById(tileID).style.backgroundImage = "url(assets/rockTile.png)";
        document.getElementById(tileID).style.backgroundSize = "100%";
        document.getElementById(tileID).style.transform = "rotate(0deg)";

            rockImage();
        
    }
    else{
        document.getElementById(tileID).style.background = "#ff7d7d";
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
        if(showImages == true){
            rockImage();
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
    if(showImages == true){
        document.getElementById(tileID).style.backgroundImage = "url(assets/roverTile.png)";
        document.getElementById(tileID).style.backgroundSize = "100%";
        document.getElementById(tileID).style.transform = "rotate(0deg)";

    }
    else{
        document.getElementById(tileID).style.background = "#ffa9f8";
    }
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
    constructor(x, y, camefromX, cameFromY, gScore, hScore, parent, parentCameFrom) {
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
        this.parentCameFrom = parentCameFrom;
    }
}


//temporary function for the HTML button click, i'm just using this to test and figure out stuff, mainly about the A* pathfinder algorithm
function buttonClick(){
    let temp = true;
    if(firstClick == false){
        if(window.confirm("Recomenda-se atualizar a pagina antes de usa-la novamente! (F5)") == true){
            window.location.reload();
            return;
        }
        else{
            temp == false;
        }
    }

    aStar();

    if(temp == true){
        firstClick = false;
    }
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
    let neighborTop = new Node(current.x, current.y-1, current.x, current.y, current.gScore+1, getManhattanDistance(current.x, current.y-1, objectiveObj.x, objectiveObj.y), current, "bottom");
    if(testNeighbor(neighborTop) == 1){
        neighbors.push(neighborTop);
    }

    //get neighbor botton
    let neighborBottom = new Node(current.x, current.y+1, current.x, current.y, current.gScore+1, getManhattanDistance(current.x, current.y+1, objectiveObj.x, objectiveObj.y), current, "top");
    if(testNeighbor(neighborBottom) == 1){
        neighbors.push(neighborBottom);
    }

    //get neighbor right
    let neighborRight = new Node(current.x+1, current.y, current.x, current.y, current.gScore+1, getManhattanDistance(current.x+1, current.y, objectiveObj.x, objectiveObj.y), current, "left");
    if(testNeighbor(neighborRight) == 1){
        neighbors.push(neighborRight);
    }

    //get neighbor left
    let neighborLeft = new Node(current.x-1, current.y, current.x, current.y, current.gScore+1, getManhattanDistance(current.x-1, current.y, objectiveObj.x, objectiveObj.y), current, "right");
    if(testNeighbor(neighborLeft) == 1){
        neighbors.push(neighborLeft);
    }

    return neighbors;
}

//function that returns all valid and invalid neighbors (i should probably join the two functions into one but...)
function getAllNeighbors(current, objectiveObj){
    let neighbors = [];
    //get neighbor top
    let neighborTop = new Node(current.x, current.y-1, current.x, current.y, current.gScore+1, getManhattanDistance(current.x, current.y-1, objectiveObj.x, objectiveObj.y), current, "bottom");
    if(testNeighbor(neighborTop) == 1){
        neighborTop.valid = true;
        neighbors.push(neighborTop);
    }
    else{
        neighborTop.valid = false
        neighbors.push(neighborTop);
    }
    

    //get neighbor botton
    let neighborBottom = new Node(current.x, current.y+1, current.x, current.y, current.gScore+1, getManhattanDistance(current.x, current.y+1, objectiveObj.x, objectiveObj.y), current, "top");
    if(testNeighbor(neighborBottom) == 1){
        neighborBottom.valid = true;
        neighbors.push(neighborBottom);
    }
    else{
        neighborBottom.valid = false;
        neighbors.push(neighborBottom);
    }
    

    //get neighbor right
    let neighborRight = new Node(current.x+1, current.y, current.x, current.y, current.gScore+1, getManhattanDistance(current.x+1, current.y, objectiveObj.x, objectiveObj.y), current, "left");
    if(testNeighbor(neighborRight) == 1){
        neighborRight.valid = true;
        neighbors.push(neighborRight);
    }
    else{
        neighborRight.valid = false;
        neighbors.push(neighborRight);
    }
    

    //get neighbor left
    let neighborLeft = new Node(current.x-1, current.y, current.x, current.y, current.gScore+1, getManhattanDistance(current.x-1, current.y, objectiveObj.x, objectiveObj.y), current, "right");
    if(testNeighbor(neighborLeft) == 1){
        neighborLeft.valid = true;
        neighbors.push(neighborLeft);
    }
    else{
        neighborLeft.valid = false;
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
let oldPath = [];
let directionsPath = [];

function retracePath(startNode, endNode){
    let path = [];
    directionsPath = [];
    globalPath = [];

    let currentNode = endNode;
    
    while(currentNode.id != startNode.id){
        path.push(currentNode.id);
        directionsPath.push(currentNode.parentCameFrom);
        currentNode = currentNode.parent;
    }

    globalPath = path;
    return path;
}

//function that draws tire tracks on the path
function drawPath(path){
    //this part will clean old tracks
    if(oldPath != []){
        for(let j = 1; j < oldPath.length; j++){
            document.getElementById(oldPath[j]).style.background = "white"; 
        }
    }
    oldPath = path;

    
    //this part will draw the right tracks, following turns and straights
    //it's based on this chart => https://www.invertexto.com/?n=Q1KPFiJ   (image version => https://imgur.com/a/S6y4fxE)
    for(let i = path.length - 1; i > 0; i--){
        if(showImages == true){
        let nextDirection;
        switch(directionsPath[i-1]){
            case "bottom": nextDirection = "top";
                break;
            case "top": nextDirection = "bottom";
                break;
            case "right": nextDirection = "left";
                break;
            case "left": nextDirection = "right";
                break;
        }

        let currentDirection = directionsPath[i] + " " + nextDirection;

        //track 0deg
        if(currentDirection == "bottom bottom" || currentDirection == "bottom top" || currentDirection == "top bottom" || currentDirection == "top top"){
            document.getElementById(path[i]).style.backgroundImage = "url(assets/trackTile.png)";
            document.getElementById(path[i]).style.transform = "rotate(0deg)";
            document.getElementById(path[i]).style.backgroundSize = "cover";
        }
        //track 90deg
        else if(currentDirection == "right left" || currentDirection == "right right" || currentDirection == "left left" || currentDirection == "left right"){
            document.getElementById(path[i]).style.backgroundImage = "url(assets/trackTile.png)";
            document.getElementById(path[i]).style.transform = "rotate(90deg)";
            document.getElementById(path[i]).style.backgroundSize = "cover";
        }
        //turn 0deg
        else if(currentDirection == "bottom right" || currentDirection == "right bottom"){
            document.getElementById(path[i]).style.backgroundImage = "url(assets/turnTile.png)";
            document.getElementById(path[i]).style.transform = "rotate(0deg)";
            document.getElementById(path[i]).style.backgroundSize = "cover";
        }
        //turn 90deg
        else if(currentDirection == "bottom left" || currentDirection == "left bottom"){
            document.getElementById(path[i]).style.backgroundImage = "url(assets/turnTile.png)";
            document.getElementById(path[i]).style.transform = "rotate(90deg)";
            document.getElementById(path[i]).style.backgroundSize = "cover";
        }
        //turn 180deg
        else if(currentDirection == "top left" || currentDirection == "left top"){
            document.getElementById(path[i]).style.backgroundImage = "url(assets/turnTile.png)";
            document.getElementById(path[i]).style.transform = "rotate(180deg)";
            document.getElementById(path[i]).style.backgroundSize = "cover";
        }
        //turn 270deg
        else if(currentDirection == "top right" || currentDirection == "right top"){
            document.getElementById(path[i]).style.backgroundImage = "url(assets/turnTile.png)";
            document.getElementById(path[i]).style.transform = "rotate(270deg)";
            document.getElementById(path[i]).style.backgroundSize = "cover";
        }
        //error
        else{
        console.log("ERROR ON", currentDirection);
        document.getElementById(path[i]).style.background = "aqua";
        }
    }
    else{
        document.getElementById(path[i]).style.background = "aqua"; 
    }

    }
}

// TODO LIST 2
// SAVE THIS IS BROWSER'S CACHE

//function that controls if images are shown
function imagesSwitch(){
    showImages = document.getElementById("imagesSwitch").checked;
    if(showImages == true){
        localStorage.setItem("showImages", "true");
    }
    else{
        localStorage.setItem("showImages", "false");
    }
}

function updateSwitch(){
    console.log("hello!!", localStorage.getItem("showImages"))
    if(localStorage.getItem("showImages") == "true"){
        showImages = true;
        document.getElementById("imagesSwitch").checked = true;
    }
    else{
        showImages = false;
        document.getElementById("imagesSwitch").checked = false;
    }
}

function rockImage(){

    for(let i = 0; i < obstacles.length; i++){
        console.log("obstacle=", obstacles[i])
        let currentObstacle = new Node(parseInt(obstacles[i].match(/\d/g)[0]), parseInt(obstacles[i].match(/\d/g)[1]));
        let objectiveObjTemp = new Node(parseInt(objective.match(/\d/g)[0]), parseInt(objective.match(/\d/g)[1]));
        let neighbors = []
        neighbors = getAllNeighbors(currentObstacle, objectiveObjTemp);
        console.log(neighbors);
        let neighborAmount = 0;
        let currentObstacleID = obstacles[i];
        let neighborsDirectionsArray = [];
        for(let j = 0; j < neighbors.length; j++){
            
            if(neighbors[j].valid == false){
                neighborAmount++;
                neighborsDirectionsArray.push(neighbors[j].parentCameFrom)
            }
            
        }
        console.log(neighborAmount);
        

        let neighborsDirections = neighborsDirectionsArray.join(" ");
        console.log(neighborsDirections)

        //THIS IS WORKING, JUST NEED TO FIX THE ROTATION
        //neighbors.parentCameFrom is opposite
        //so is neighbors.parentCameFrom == bottom it means that the rock should connect to something that's on top of it
        //need to finish switch cases for all types of images
        //create new images, example: rock2 should be different is connections are top-bottom or left-right compared to top-right for example
        //one should be shaped like an L (the one that already exists) and the other should be shaped like an I

        switch(neighborAmount){
            case 0:
                document.getElementById(currentObstacleID).style.backgroundImage = "url(assets/rock0.png)";
                document.getElementById(currentObstacleID).style.backgroundSize = "100%";
                document.getElementById(currentObstacleID).style.transform = "rotate(0deg)";
                break;
            case 1:
                document.getElementById(currentObstacleID).style.backgroundImage = "url(assets/rock1.png)";
                document.getElementById(currentObstacleID).style.backgroundSize = "100%";
                switch(neighborsDirections){
                    //connect to top
                    case "bottom": document.getElementById(currentObstacleID).style.transform = "rotate(90deg)";
                        break;
                    //connect to bottom
                    case "top": document.getElementById(currentObstacleID).style.transform = "rotate(270deg)";
                        break;
                    //connect to right
                    case "left": document.getElementById(currentObstacleID).style.transform = "rotate(180deg)";
                        break;
                    //connect to left
                    case "right": document.getElementById(currentObstacleID).style.transform = "rotate(0deg)";
                        break;
                }
                break;
                //case 2 based on this: https://imgur.com/a/auxYnAP
            case 2:
                document.getElementById(currentObstacleID).style.backgroundImage = "url(assets/rock2.png)";
                document.getElementById(currentObstacleID).style.backgroundSize = "100%";
                document.getElementById(currentObstacleID).style.transform = "rotate(0deg)";
                console.log(neighborsDirections)
                if(neighborsDirections == "bottom left" || neighborsDirections == "left bottom"){
                    document.getElementById(currentObstacleID).style.transform = "rotate(90deg)";
                }
                else if(neighborsDirections == "top left" || neighborsDirections == "left top"){
                    document.getElementById(currentObstacleID).style.transform = "rotate(180deg)";
                }
                else if(neighborsDirections == "top right" || neighborsDirections == "right top"){
                    document.getElementById(currentObstacleID).style.transform = "rotate(270deg)";
                }
                else if(neighborsDirections == "right left" || neighborsDirections == "left right"){
                    document.getElementById(currentObstacleID).style.backgroundImage = "url(assets/rock22.png)";
                }
                else if(neighborsDirections == "top bottom" || neighborsDirections == "bottom top"){
                    document.getElementById(currentObstacleID).style.backgroundImage = "url(assets/rock22.png)";
                    document.getElementById(currentObstacleID).style.transform = "rotate(90deg)";
                }
                break;
                //case 3based on this: https://imgur.com/a/zXxYy3z
            case 3:
                document.getElementById(currentObstacleID).style.backgroundImage = "url(assets/rock3.png)";
                document.getElementById(currentObstacleID).style.backgroundSize = "100%";
                document.getElementById(currentObstacleID).style.transform = "rotate(0deg)";
                if(neighborsDirectionsArray.includes("bottom") && neighborsDirectionsArray.includes("right") && neighborsDirectionsArray.includes("left")){
                    document.getElementById(currentObstacleID).style.transform = "rotate(90deg)"; console.log("90deg")
                }
                else if(neighborsDirectionsArray.includes("bottom") && neighborsDirectionsArray.includes("left") && neighborsDirectionsArray.includes("top")){
                    document.getElementById(currentObstacleID).style.transform = "rotate(180deg)"; console.log("180deg")
                }
                else if(neighborsDirectionsArray.includes("top") && neighborsDirectionsArray.includes("left") && neighborsDirectionsArray.includes("right")){
                    document.getElementById(currentObstacleID).style.transform = "rotate(270deg)"; console.log("270deg")
                }
                break;
            case 4:
                document.getElementById(currentObstacleID).style.backgroundImage = "url(assets/rock4.png)";
                document.getElementById(currentObstacleID).style.backgroundSize = "100%";
                switch(neighborsDirections){}
                break;
        }
        
    }
}