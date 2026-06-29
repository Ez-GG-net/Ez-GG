function isPointCollidingWithObject(pointX, pointY,object) {
    const objectX = object.x;
    const objectY = object.y;
    const objectWidth = object.width;
    const objectHeight = object.height;
    
    // Check if the point is within the boundaries of the object
    return (pointX >= objectX && pointX <= objectX + objectWidth) &&
        (pointY >= objectY && pointY <= objectY + objectHeight);
}
function isRectsColliding(object1,object2) {

    // Check if the rectangles are intersecting
    return (object1.x < object2.x + object2.width &&
        object1.x + object1.width > object2.x &&
        object1.y < object2.y + object2.height &&
        object1.y + object1.height > object2.y);    
}
function isCircleAndRectColliding(circle, rect) {
               // Find the closest point on the rectangle to the circle's center
               const closestX = Math.max(rect.x, Math.min(circle.x, rect.x + rect.width));
               const closestY = Math.max(rect.y, Math.min(circle.y, rect.y + rect.height));
           
               // Calculate the distance between the circle's center and this closest point
               const dx = closestX - circle.x;
               const dy = closestY - circle.y;
               const distance = Math.sqrt(dx * dx + dy * dy);
           
               // Check if the closest point is inside the circle
               return (distance < circle.radius) 

}
function isCirclesColliding(circle1,circle2){
    // Calculate the distance between the two circles' centers
    const dx = circle1.x - circle2.x;
    const dy = circle1.y - circle2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Check if the sum of the circles' radii is greater than the distance between their centers
    return (circle1.radius + circle2.radius > distance);

}