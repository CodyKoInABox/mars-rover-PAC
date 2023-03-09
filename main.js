

const mapContainer = document.querySelector(".mapContainer");


// constructor for coordinates object, useful to easily and quickly define coordinates
class coordinates{
    constructor(){
        this.x;
        this.y;
    }
}


mapContainer.addEventListener('click', e => {
    console.log(e.target);
    console.log(e.target.id);
})