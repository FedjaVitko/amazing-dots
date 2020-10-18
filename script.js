const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d'); canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const NUMBER_OF_PARTICLES = 5000;
const MOUSE_DISTANCE_MAX = 70;
const PARTICLE_SIZE_LARGE = 5;
const FRAME_RATE = 60;
const SIZE_SPEED = 1;
const COLOR_SPEED = 1;
const TRIGGERED_SIZE = 10;

const particleArray = [];

// handle mouse
const mouse = {
    x: null,
    y: null,
    radius: MOUSE_DISTANCE_MAX
}

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x; 
    mouse.y = event.y;
    console.log(mouse);
});

ctx.font = "30px Verdana";
ctx.fillStyle = 'white';
ctx.fillText('A', 0, 40);
const data = ctx.getImageData(0, 0, 100, 100);

const createParticle = (initialX, initialY) => {
    let x = initialX;
    let y = initialY;
    let size = 3;
    const baseX = initialX;
    const baseY = initialY;
    const baseSize = size;
    let red = 255;
    let green = 255;
    let blue = 255;
    let density = (Math.random() * 30) + 1;
    let triggered = false;
    
    return {
        draw() {
            ctx.fillStyle = `rgb(${red},${green},${blue})`;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        },
        update() {
            const dx = mouse.x - x;
            const dy = mouse.y - y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const maxDistance = mouse.radius;
            const force = (maxDistance - distance) / maxDistance;
            const speedX = forceDirectionX * force;
            const speedY = forceDirectionY * force;
            if (triggered) {
                red -= COLOR_SPEED;
                //green -= COLOR_SPEED;
                //blue -= COLOR_SPEED;
            } else {
                if (distance < maxDistance) {
                    size += SIZE_SPEED;
                } else {
                    if (size > baseSize) {
                        size -= SIZE_SPEED;
                    }
                } 
                if (size > TRIGGERED_SIZE) {
                    triggered = true;
                }
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particleArray.forEach(particle => {
        particle.draw();
        particle.update();
    })
    // requestAnimationFrame(animate)
}

function init() {
    for (let i = 0; i < NUMBER_OF_PARTICLES; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particleArray.push(createParticle(x, y));
    }
}

function main() {
    init();
    setInterval(animate, 1000 / FRAME_RATE);
}

main();
