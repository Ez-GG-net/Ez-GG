let shotGrapple = false;
let grappleAttached = false;
let handGrapple = { x: 0, y: 0, width: 10, height: 10, velocity: { x: 0, y: 0 } };
let wirePoints = []; // Stores path for the wire wrapping

function calculateGrapple() {
    if (mouse.pressed[0]) {
        if (!shotGrapple) {
            // Shoot the grapple from player
            shotGrapple = true;
            grappleAttached = false;
            wirePoints = [{ x: player.x, y: player.y }];

            let angle = player.rotation * Math.PI / 180;
            handGrapple.x = player.x + Math.cos(angle) * 15;
            handGrapple.y = player.y + Math.sin(angle) * 15;

            handGrapple.velocity.x = Math.cos(angle) * 10;
            handGrapple.velocity.y = Math.sin(angle) * 10;
        }
    } else {
        if (grappleAttached) {
            shotGrapple = false;
            grappleAttached = false;
        }
    }

    if (shotGrapple && !grappleAttached) {
        let nextX = handGrapple.x + handGrapple.velocity.x;
        let nextY = handGrapple.y + handGrapple.velocity.y;

        if (!checkCollision(nextX, nextY)) {
            handGrapple.x = nextX;
            handGrapple.y = nextY;
        } else {
            grappleAttached = true;
            handGrapple.velocity.x = 0;
            handGrapple.velocity.y = 0;
       
        }
    }

    if (!shotGrapple) {
        handGrapple.x = player.x;
        handGrapple.y = player.y;
        wirePoints = [];
    }
    updateWirePath();
}

// 🔍 Collision Detection
function checkCollision(x, y) {
    return objects.some(obj =>
        x >= obj.x && x <= obj.x + obj.width &&
        y >= obj.y && y <= obj.y + obj.height
    );
}

// 📌 Wire Wrapping Logic
function updateWirePath() {
    let start = { x: player.x, y: player.y };
    let end = { x: handGrapple.x, y: handGrapple.y };
    let path = [start];

    for (let i = 0; i < 10; i++) {
        if (!isObstructed(path[path.length - 1], end)) {
            path.push(end);
            break;
        }

        let closestCorner = findClosestCorner(path[path.length - 1]);
        if (!closestCorner) break;

        path.push(closestCorner);
    }

    wirePoints = path;
}

// 🔄 Check if path is obstructed
function isObstructed(start, end) {
    let dx = end.x - start.x;
    let dy = end.y - start.y;
    let steps = Math.max(Math.abs(dx), Math.abs(dy)) / 5;

    for (let i = 0; i <= steps; i++) {
        let x = start.x + (dx * i / steps);
        let y = start.y + (dy * i / steps);
        if (checkCollision(x, y)) return true;
    }
    return false;
}

// 📍 Find the closest corner of an object
function findClosestCorner(point) {
    let closest = null;
    let minDist = Infinity;

    objects.forEach(obj => {
        let corners = [
            { x: obj.x, y: obj.y },
            { x: obj.x + obj.width, y: obj.y },
            { x: obj.x, y: obj.y + obj.height },
            { x: obj.x + obj.width, y: obj.y + obj.height }
        ];

        corners.forEach(corner => {
            let dist = Math.hypot(corner.x - point.x, corner.y - point.y);
            if (dist < minDist && !isObstructed(point, corner)) {
                minDist = dist;
                closest = corner;
            }
        });
    });

    return closest;
}

// 🎨 Draw Grapple & Wire
function drawGrapple(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(handGrapple.x, handGrapple.y, handGrapple.width, handGrapple.height);

    if (wirePoints.length > 1) {
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(wirePoints[0].x, wirePoints[0].y);
        for (let i = 1; i < wirePoints.length; i++) {
            ctx.lineTo(wirePoints[i].x, wirePoints[i].y);
        }
        ctx.stroke();
    }
}
