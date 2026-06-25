setTimeout(() => {
  const c = document.querySelector(".canvasMain");
  const ctx = c.getContext("2d");

  const points = [];
  const collisionCheckInterval = 1; // Check for collisions every 1 millisecond

  let tickingRate = 1
  //*------------------------Modules--------------------------------by chatgpt

  function detectCollision(point1, point2) {
    return (
        point1.x < point2.x + point2.width &&
        point1.x + point1.width > point2.x &&
        point1.y < point2.y + point2.height &&
        point1.y + point1.height > point2.y
    );
}

function resolveCollision(point1, point2) {
    if (!detectCollision(point1, point2)) return;

    // Calculate the overlap on each axis
    const dx = (point1.x + point1.width / 2) - (point2.x + point2.width / 2);
    const dy = (point1.y + point1.height / 2) - (point2.y + point2.height / 2);
    const width = (point1.width + point2.width) / 2;
    const height = (point1.height + point2.height) / 2;

    const overlapX = width - Math.abs(dx);
    const overlapY = height - Math.abs(dy);

    // Resolve overlap along the axis with the least overlap
    if (overlapX < overlapY) {
        if (dx > 0) {
            point1.x += overlapX / 2;
            point2.x -= overlapX / 2;
        } else {
            point1.x -= overlapX / 2;
            point2.x += overlapX / 2;
        }
        // Exchange velocities for bounce effect
        point1.velocity.x = -point1.velocity.x * bounceFactor;
        point2.velocity.x = -point2.velocity.x * bounceFactor;
    } else {
        if (dy > 0) {
            point1.y += overlapY / 2;
            point2.y -= overlapY / 2;
        } else {
            point1.y -= overlapY / 2;
            point2.y += overlapY / 2;
        }
        // Exchange velocities for bounce effect
        point1.velocity.y = -point1.velocity.y * bounceFactor;
        point2.velocity.y = -point2.velocity.y * bounceFactor;
    }

    // Apply friction
    point1.velocity.x *= friction;
    point2.velocity.x *= friction;
    point1.velocity.y *= friction;
    point2.velocity.y *= friction;
}

function checkGroundCollision(point) {
    if (point.y + point.height > groundY) {
        point.y = groundY - point.height;
        point.velocity.y *= -bounceFactor;
        point.velocity.x *= friction;

        if (Math.abs(point.velocity.y) < 1) {
            point.velocity.y = 0;
        }
    }
}
function checkWallCollision(point) {
    if (point.x + point.width > c.width) {
        point.x = c.width - point.height;
        point.velocity.x *= -bounceFactor;
        point.velocity.y *= friction;
    }
    if (point.x  < 0) {
        point.x = 0;
        point.velocity.x *= -bounceFactor;
        point.velocity.y *= friction;
    }
}

function clampVelocity(point) {
    const maxVelocity = point.height;
    const velocityMagnitude = Math.sqrt(point.velocity.x ** 2 + point.velocity.y ** 2);

    if (velocityMagnitude > maxVelocity) {
        const scale = maxVelocity / velocityMagnitude;
        point.velocity.x *= scale;
        point.velocity.y *= scale;
    }
}

// Function to check and resolve collisions
function checkCollisions() {
    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            resolveCollision(points[i], points[j]);
        }
    }
}

//*-------------------------Generation --------------------
  const generatePoints = (color = 'rgb(2, 171, 227)') => {
    for (let i = 0; i < 200; i++) {
    points.push({
      x: Math.random() + c.width/2,
      y:  c.height/2,
      height: 10,
      width:10,
      velocity: {
        x: 0,
        y: 0,
      },
      color:color
    });
}


  };
  setTimeout(() => {
    generatePoints(/*'red'*/);
  }, 2000*tickingRate);
  setTimeout(() => {
    generatePoints(/*'red'*/);
  }, 4000*tickingRate);
  setTimeout(() => {
    generatePoints(/*'red'*/);
  }, 6000*tickingRate);
  setTimeout(() => {
    generatePoints(/*'red'*/);
  }, 8000*tickingRate);

  //*------------------------Repeating --------------------*//

  //*-----------------------Physics --------------------
const gravity = 0.98
const bounceFactor = 0;
const friction = 1
let groundY = c.height
  const movePoints = ()=>{
   
    points.forEach(point => {
        point.velocity.y += gravity;
        point.x += point.velocity.x;
        point.y += point.velocity.y;

        checkGroundCollision(point);
        checkWallCollision(point);
        clampVelocity(point);
    });
  }

  setInterval(checkCollisions, collisionCheckInterval);
  
   

  //*-----------------------Rendering --------------------
  const drawPoints = () => {
    ctx.beginPath();
    const inflation = 13
    for (let i = 0; i < points.length; i++) {
      
      ctx.fillStyle = `rgb(0,0,${c.height-points[i].y*0.9})`;
      ctx.fillRect(points[i].x-inflation/2, points[i].y-inflation/2, points[i].width+inflation/2, points[i].height+inflation/2);
    }
    ctx.stroke();
  };
  const updateWindowSize = () => {
    ctx.canvas.width = document.body.offsetWidth;
    ctx.canvas.height = document.body.offsetHeight;
    groundY = c.height -20
  };
  const start = () => {
    generatePoints();
  };

  const repeat = () => {
    updateWindowSize();
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillStyle = "rgb(7, 0, 31)";
    ctx.fillRect(0, 0, c.width, c.height);

    //physics
    movePoints()

    //draw
    drawPoints();
    setTimeout(repeat, tickingRate);
  };
  repeat();
  start();
}, 1);
