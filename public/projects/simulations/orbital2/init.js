//*Define variables here for simplicity
//(Use "_" for user friendly variables)

const game = {
    friction:0.03
}

const camera = {
    x: 0,
    y: 0,
    scale:1,
}
let followPlanetIndex = -1;

let _renderAhead = 12
let _renderAheadLineWidth = 1

const planets = [
    {
        ...new Vector2D(-150, 0),
        width:30,
        height:30,
        color:'red',
        velocity:new Vector2D(0,-14),
        mass:(30**2)*100
    },
    {
        ...new Vector2D(150, 0),
        width:30,
        height:30,
        color:'blue',
        velocity:new Vector2D(0,14),
        mass:(30**2)*100
    },
    /*{
        ...new Vector2D(c.width/2+500, c.height/2),
        width:15,
        height:15,
        color:'green',
        velocity:new Vector2D(0,-2.5),
        mass:(15**2)*100
    },*/

    //Earth Moon & Sun example

  /*  {
        ...new Vector2D(c.width/2-350, c.height/2),
        width:10*15,
        height:10*15,
        color:'red',
        velocity:new Vector2D(0,7),
        mass:(10**2)*100
    },
    {
        ...new Vector2D(c.width/2-250, c.height/2-5),
        width:5*15,
        height:5*15,
        color:'green',
        velocity:new Vector2D(-1,7+9.3),
        mass:(0.1^2)*100
    },
    {
        ...new Vector2D(c.width/2+12400, c.height/2),
        width:30*15,
        height:30*15,
        color:'yellow',
        velocity:new Vector2D(0,0),
        mass:(80**2)*100
    }*/
]
