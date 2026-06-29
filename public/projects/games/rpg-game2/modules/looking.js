function getLookAtDegree(startpos,endpos){
    // Calculate the angle between the startpos and endpos vectors
    let dx = endpos.x - startpos.x;
    let dy = endpos.y - startpos.y;

    // Calculate the angle in degrees
    let angle = Math.atan2(dy, dx) * (180 / Math.PI);

    return angle;

}
function findMovementFromDegree(degrees) {
    // Convert the degrees to radians
    let radians = degrees * (Math.PI / 180);

    // Calculate the movement vector
    let movement = {
        x: -Math.cos(radians).toPrecision(21),
        y: -Math.sin(radians).toPrecision(21)
    };
    return movement;
}