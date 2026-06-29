//*Define variables here for simplicity
//(Use "_" for user friendly variables)

const game = {
    friction:0.03
}

const camera = {
    x: 0,
    y: 0,
}



const player = {
    ...new Vector(1100,500),
    velocity: new Vector(0,0),
    width:30,
    height:30,
    speed: 10,
    color: '#4287f5',
    rotation:0,
}
/*const handGrapple = {
    ...new Vector(0,0),
    width:10,
    height:10,
    color: 'blue',
}*/
const objects = []
const npcs = []
const furniture = []
fetch('./objects.json').then(res=>res.json())
.then(objs=>{
    objects.push(...objs.filter(o=>o.color == 'rgba(174, 158, 255, 1)'))
    npcs.push(...objs.filter(obj=>obj.color == 'rgba(255, 0, 0, 1)'))
    furniture.push(...objs.filter(obj=>obj.color != 'rgba(174, 158, 255, 1)' && obj.color != 'rgba(255, 0, 0, 1)'))
})

