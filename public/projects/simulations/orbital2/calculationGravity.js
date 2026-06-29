const G = 1/1; // Gravitational constant (adjust as needed)

function calculateGravity(multiplier=1) {
    planets.forEach(planet => {
        let totalForceX = 0;
        let totalForceY = 0;

        planets.forEach(otherPlanet => {
            if (planet === otherPlanet) return; // Skip self-interaction

            // Calculate distance components
            let dx = otherPlanet.x - planet.x;
            let dy = otherPlanet.y - planet.y;
            let distance = Math.hypot(dx, dy);

            if (distance === 0) return; // Avoid division by zero

            // Calculate gravitational force magnitude
            let force = (G * planet.mass * otherPlanet.mass) / (distance * distance);

            // Convert force to x, y components
            let forceX = (force * dx) / distance;
            let forceY = (force * dy) / distance;

            // Sum up forces from all other planets
            totalForceX += forceX;
            totalForceY += forceY;
        });

        // Apply Newton's Second Law (F = ma -> a = F/m)
        let accelerationX = totalForceX / planet.mass;
        let accelerationY = totalForceY / planet.mass;

        // Update velocity
        planet.velocity.x += accelerationX;
        planet.velocity.y += accelerationY;
    });

    // Update positions after forces have been calculated
    planets.forEach(planet => {
        planet.x += planet.velocity.x;
        planet.y += planet.velocity.y;
    });
}
function predictFuturePath(targetPlanet, steps = 100, timeStep = 1) {
    // Deep copy of all planets to avoid modifying the original ones
    let tempPlanets = planets.map(p => ({
        x: p.x,
        y: p.y,
        velocity: { x: p.velocity.x, y: p.velocity.y },
        mass: p.mass
    }));

    let futurePositions = [];

    for (let i = 0; i < steps; i++) {
        let forces = tempPlanets.map(() => ({ x: 0, y: 0 })); // Store forces for each planet

        // Compute forces for all planets
        for (let j = 0; j < tempPlanets.length; j++) {
            for (let k = 0; k < tempPlanets.length; k++) {
                if (j === k) continue; // Skip self-interaction

                let dx = tempPlanets[k].x - tempPlanets[j].x;
                let dy = tempPlanets[k].y - tempPlanets[j].y;
                let distance = Math.hypot(dx, dy);

                if (distance === 0) continue; // Prevent division by zero

                let force = (G * tempPlanets[j].mass * tempPlanets[k].mass) / (distance * distance);
                let forceX = (force * dx) / distance;
                let forceY = (force * dy) / distance;

                forces[j].x += forceX;
                forces[j].y += forceY;
            }
        }

        // Apply forces and update positions for all planets
        tempPlanets.forEach((planet, index) => {
            let accelerationX = forces[index].x / planet.mass;
            let accelerationY = forces[index].y / planet.mass;

            planet.velocity.x += accelerationX * timeStep;
            planet.velocity.y += accelerationY * timeStep;

            planet.x += planet.velocity.x * timeStep;
            planet.y += planet.velocity.y * timeStep;
        });

        // Store future positions of the target planet
        let targetIndex = planets.indexOf(targetPlanet);
        futurePositions.push({ x: tempPlanets[targetIndex].x, y: tempPlanets[targetIndex].y });
    }

    return futurePositions;
}
