const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // Boid class
    class Boid {
      constructor(x, y, vx, vy) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.radius = 5;
        this.maxSpeed = 2;
        this.maxForce = 0.1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around the canvas
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'blue';
        ctx.fill();
      }

      applySeparation(boids) {
        const desiredSeparation = 20;
        const steer = { x: 0, y: 0 };
        let count = 0;

        for (const other of boids) {
          const distance = Math.sqrt((this.x - other.x) ** 2 + (this.y - other.y) ** 2);

          if (other !== this && distance < desiredSeparation) {
            const diff = { x: this.x - other.x, y: this.y - other.y };
            const length = Math.sqrt(diff.x ** 2 + diff.y ** 2);

            diff.x /= length;
            diff.y /= length;

            steer.x += diff.x;
            steer.y += diff.y;
            count++;
          }
        }

        if (count > 0) {
          steer.x /= count;
          steer.y /= count;

          const length = Math.sqrt(steer.x ** 2 + steer.y ** 2);
          steer.x /= length;
          steer.y /= length;

          steer.x *= this.maxSpeed;
          steer.y *= this.maxSpeed;

          steer.x -= this.vx;
          steer.y -= this.vy;

          const steerLength = Math.sqrt(steer.x ** 2 + steer.y ** 2);
          steer.x /= steerLength;
          steer.y /= steerLength;

          steer.x *= this.maxForce;
          steer.y *= this.maxForce;
        }

        this.vx += steer.x;
        this.vy += steer.y;
      }
    }

    // Create a flock of boids
    const flock = [];
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const vx = Math.random() * 2 - 1;
      const vy = Math.random() * 2 - 1;

      flock.push(new Boid(x, y, vx, vy));
    }

    // Update and draw the flock
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const boid of flock) {
        boid.applySeparation(flock);
        boid.update();
        boid.draw();
      }

      requestAnimationFrame(animate);
    }

    animate();