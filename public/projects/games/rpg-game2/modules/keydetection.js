const key = {}
const mouse = {
    down:false,
    up:true,
    x:0,
    y:0,
    pressed:[false, false, false]  // left, middle, right button
}
window.addEventListener('keydown', (event)=>{
    key[event.key] = true
    if ( key[event.key].onpressedRepeat) {
    key[event.key].onpressedRepeat()
    }
    if (key[event.key] == true) {
        if ( key[event.key].onpressed) {
        key[event.key].onpressed()
        }
    }
})

window.addEventListener('keyup', (event)=>{
    key[event.key] = false
})
window.addEventListener('mousemove', (event)=>{
    let Tcamera = camera

    
    if (Tcamera == undefined)  Tcamera = {x:0, y:0}


    mouse.x = event.clientX + Tcamera.x
    mouse.y = event.clientY + Tcamera.y

    
})
window.addEventListener('mousedown',(e)=>{
    mouse.pressed[e.button] = true
    mouse.down = true
    mouse.up = false
    })
    window.addEventListener('mouseup',(e)=>{
    mouse.pressed[e.button] = false
    mouse.down = false
    mouse.up = true
    })