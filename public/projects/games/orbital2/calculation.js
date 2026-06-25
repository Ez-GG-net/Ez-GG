let calculateInterval;



function calculate(){
    if (key[' ']) {
        const multiplier = key['[']?2:key["]"]?4:1
        console.log( multiplier)
        for (let i =0; i < multiplier; i++){
   calculateGravity()
        }
    }
   CameraControls()

}
let toggleMode = 1
let recentlyToggled = false
function CameraControls(){
    if (toggleMode == 1) {
    const speed = 50
    const zoomspeed = 0.05
    if (key.w) {

        camera.y -= speed
    }
    if (key.s) {
        camera.y += speed
    }
    if (key.a) {
        camera.x -= speed
    }
    if (key.d) {
        camera.x += speed
    }
    if (key.q) {
        camera.scale += zoomspeed
    }
    if (key.e) {
        camera.scale -= zoomspeed
    }
    } else if (toggleMode == 0) {
    //Set it to the average planet y
const avgPlanetY = 
(planets[2]?planets[2].y:planets[0].y
+planets[1].y
+planets[0].y
)/(4)

    camera.y = avgPlanetY
    }

    if (key.r && !recentlyToggled) { 
       
       recentlyToggled = true //
          
            toggleMode = toggleMode==0?1:0
        
    }
    if (!key.r) {
        recentlyToggled = false
    }
}
