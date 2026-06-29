const keyPressed = {

}
document.addEventListener('keydown',(e)=>{
    setTimeout(()=>{
        if (typedInInputField) return
keyPressed[e.key] = true
    },1)
})
document.addEventListener('keyup',(e)=>{
    keyPressed[e.key] = false
})

//! Too lazy to implement good functionality, (Buggy)
/*document.addEventListener("wheel", (e) => {
  
    // Adjust the zoom level based on the scroll delta
    const zoomSpeed = 1/1000; // Speed of zoom
    camera.zoom -= e.deltaY * zoomSpeed;

    // Clamp the zoom level to avoid extreme values
    camera.zoom = Math.floor(Math.max(0.1, Math.min(camera.zoom, 10))*100)/100;

    // Example: Log the current zoom level
    console.log("Camera Zoom:", camera.zoom);
    drawElements()
    if (selectedElementIndex !== null){
        drawResizeBorderAndHandles(elementsArray[selectedElementIndex])
    }
});*/
function cameraControls(){
    const speed = 2
    if (keyPressed['w']){
        camera.y -= speed 
    }
    if (keyPressed['s']){
        camera.y += speed
    }
    if (keyPressed['a']){
        camera.x -= speed
    }
    if (keyPressed['d']){
        camera.x += speed
    }
    camera.x = Math.max(0, camera.x)
    camera.y = Math.max(0, camera.y)
    if (keyPressed['w'] || keyPressed['s'] || keyPressed['a'] || keyPressed['d']){
        drawElements()
        if (selectedElementIndex !== null) {
            drawResizeBorderAndHandles(elementsArray[selectedElementIndex])
        }
    }
}
setInterval(cameraControls,1)