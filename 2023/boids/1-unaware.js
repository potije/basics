const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

class Boid {
  constructor(x, y) {
    this.position = { x, y };
    this.angle = Math.random() * Math.PI * 2; // Random initial angle
    this.vx = Math.random();
    this.vy = Math.random();
    this.speed = 2;
    this.radius = 5;
  }

  update() {
    // Update position based on angle and speed
    this.position.x += this.vx * this.speed;
    this.position.y += this.vy * this.speed;

    // Boundary checking (wrap around)
    if (this.position.x < 0) this.position.x = canvas.width;
    if (this.position.x > canvas.width) this.position.x = 0;
    if (this.position.y < 0) this.position.y = canvas.height;
    if (this.position.y > canvas.height) this.position.y = 0;
  }

  draw(ctx) {
    // Draw a simple circle representing the boid
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.closePath();
  }
}

// Create an array to store boids
const boids = [];

// Initialize 50 boids
for (let i = 0; i < 50; i++) {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  boids.push(new Boid(x, y));
}

// Example usage

function animate() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update and draw each boid
  for (const boid of boids) {
    boid.update();
    boid.draw(ctx);
  }

  // Request the next animation frame
  requestAnimationFrame(animate);
}

// Start the animation loop
animate();
