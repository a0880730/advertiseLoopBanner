const images = document.querySelector('.images');

const imagesRotator = document.querySelector('.images__rotator');

const rotationAngles = { x: 4, y: 200, z: 0 };

document.body.addEventListener('wheel', e => {
    const friction = 6;
    const wheel = e.deltaY / friction;
    rotationAngles.y -= wheel;
    setWheelMomentum(wheel);
})

document.body.addEventListener('mousemove', e => {
    const y = e.clientY - (innerHeight / 2);
    const x = e.clientX - (innerWidth / 2);
    rotationAngles.x = y / 60;
    rotationAngles.z = x / 100;
});

const animateImages = () => {
    images.style.setProperty('transform', `rotateX(${rotationAngles.x}deg) rotateZ(${rotationAngles.z}deg)`);
};

const animateImagesRotator = () => {
    imagesRotator.style.setProperty('transform', `rotateY(${rotationAngles.y}deg)`);
}

let wheelMomentumTimeout = null;

const setwheelMomentum = (momentum = 1) => {
    console.log('setWheelMomentum', momentum)
    const friction = 1000;

    images.style.setProperty('--wheel-momentum', Math.abs(momentum / friction));

    clearTimeout(wheelMomentumTimeout);

    wheelMomentumTimeout = setTimeout(() => {
        console.log('wheelMomentumTimeout')
        images.style.setProperty('--wheel-momentum', 0);
    }, 1800);
}

function runAnimations() {
    animateImages()
    animateImagesRotator()
    requestAnimationFrame(runAnimations);
}
document.addEventListener('DOMContentLoaded', runAnimations);

