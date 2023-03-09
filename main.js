

const mapContainer = document.querySelector(".mapContainer");

mapContainer.addEventListener('click', e => {
    console.log(e.target);
    console.log(e.target.id);
})