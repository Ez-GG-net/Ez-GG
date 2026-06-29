function $ (el) {
    return document.querySelector(el);
}
function $M(el) {
    return document.querySelectorAll(el);
}
const c = $('#main')
const ctx = c.getContext('2d');


function updateCanvasSize(){
    const width = window.innerWidth;
    const height = window.innerHeight;
    c.width = width;
    c.height = height;
    
}
window.onresize = updateCanvasSize;

updateCanvasSize();
