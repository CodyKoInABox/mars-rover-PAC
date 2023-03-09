

const mapContainer = document.querySelector(".mapContainer");



// constructor for coordinates object, useful to easily and quickly define coordinates
class coordinates{
    constructor(){
        this.x;
        this.y;
    }
}

let objective = new coordinates();


mapContainer.addEventListener('mousedown', e => {
    defineObjective(e.target.id)
})

function defineObjective(tileID){
    objective.x = tileID.match(/\d/g)[0];
    objective.y = tileID.match(/\d/g)[1];
    console.log(objective.x)
    console.log(objective.y)
    console.log("----------")
}