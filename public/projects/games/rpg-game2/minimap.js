function drawMinimap() {
    const canvas = document.getElementById("minimapCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 150;
    canvas.height = 150;

    const scale = 0.20; // Adjust based on map size

    // Clear minimap
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw objects
    drawMinimapObjects(ctx, objects, "rgba(174, 158, 255, 1)", scale); // Blue
    drawMinimapObjects(ctx, npcs, "rgba(255, 0, 0, 1)", scale); // Red
    drawMinimapObjects(ctx, furniture, "rgba(100, 100, 100, 1)", scale); // Gray

    // Draw player in the center
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 5, 0, Math.PI * 2);
    ctx.fill();
}
function drawMinimapObjects(ctx, objArray, color, scale) {
    ctx.fillStyle = color;
    objArray.forEach(obj => {
        const x = (obj.x - player.x) * scale + 75;
        const y = (obj.y - player.y) * scale + 75;
       ctx.fillRect(x, y,obj.width*scale, obj.height*scale)
    });
}