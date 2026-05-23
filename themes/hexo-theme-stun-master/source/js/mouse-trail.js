/**
 * Mouse trail effect - pink flower petals
 * Creates small pink flower shapes that trail behind the cursor
 */
(function () {
  if (typeof document === 'undefined') return;

  var container = document.getElementById('container') || document.body;

  var canvas = document.createElement('canvas');
  canvas.id = 'mouse-trail-canvas';
  canvas.style.cssText =
    'position:fixed;top:0;left:0;pointer-events:none;z-index:99999;';

  var ctx = canvas.getContext('2d');
  var width, height;
  var particles = [];
  var mouseX = -100;
  var mouseY = -100;
  var lastSpawn = 0;
  var SPAWN_INTERVAL = 30; // ms between spawning particles

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }

  function Particle(x, y) {
    this.x = x;
    this.y = y;
    this.size = 2.5 + Math.random() * 3.5; // small: 2.5-6px
    // Pink color variations
    var hues = [330, 340, 345, 350, 355];
    this.hue = hues[Math.floor(Math.random() * hues.length)];
    this.saturation = 70 + Math.random() * 30;
    this.lightness = 70 + Math.random() * 20;
    this.alpha = 0.8 + Math.random() * 0.2;
    this.life = 1; // decreases to 0
    this.decay = 0.008 + Math.random() * 0.02;
    // Slight drift
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = 0.3 + Math.random() * 0.6;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() - 0.5) * 0.03;
    this.petalCount = 5;
  }

  Particle.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;
    this.rotation += this.rotationSpeed;
    this.life -= this.decay;
    this.alpha = Math.max(0, this.life * 0.85);
  };

  Particle.prototype.draw = function (ctx) {
    if (this.life <= 0) return;
    var alpha = this.alpha;
    var size = this.size * (0.5 + this.life * 0.5);

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.globalAlpha = alpha;

    // Draw 5 petals
    for (var i = 0; i < this.petalCount; i++) {
      var angle = (i / this.petalCount) * Math.PI * 2;
      var px = Math.cos(angle) * size * 0.6;
      var py = Math.sin(angle) * size * 0.6;

      ctx.beginPath();
      ctx.arc(px, py, size * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = 'hsl(' + this.hue + ', ' + this.saturation + '%, ' + this.lightness + '%)';
      ctx.fill();
    }

    // Center dot
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.28, 0, Math.PI * 2);
    ctx.fillStyle = 'hsl(25, 60%, 75%)';
    ctx.fill();

    ctx.restore();
  };

  function spawnParticle(x, y) {
    particles.push(new Particle(x, y));
    // Limit total particles
    if (particles.length > 80) {
      particles.shift();
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (var i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].draw(ctx);
      if (particles[i].life <= 0) {
        particles.splice(i, 1);
      }
    }

    requestAnimationFrame(animate);
  }

  function onMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    var now = Date.now();
    if (now - lastSpawn > SPAWN_INTERVAL) {
      lastSpawn = now;
      // Spawn 1-2 tiny flowers
      var count = Math.random() < 0.3 ? 2 : 1;
      for (var i = 0; i < count; i++) {
        var ox = (Math.random() - 0.5) * 8;
        var oy = (Math.random() - 0.5) * 8;
        spawnParticle(mouseX + ox, mouseY + oy);
      }
    }
  }

  function onMouseLeave() {
    mouseX = -100;
    mouseY = -100;
  }

  resize();
  container.appendChild(canvas);

  document.addEventListener('mousemove', onMouseMove, { passive: true });
  document.addEventListener('mouseleave', onMouseLeave);
  window.addEventListener('resize', resize);

  requestAnimationFrame(animate);
})();
