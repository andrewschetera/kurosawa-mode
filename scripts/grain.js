let grainVideo = null;

export function applyGrain() {
    removeGrain();

    grainVideo = document.createElement('video');
    grainVideo.id = 'film-grain';
    grainVideo.src = '/modules/kurosawa-mode/assets/grain.mp4';
    grainVideo.style.position = 'fixed';
    grainVideo.style.top = '0';
    grainVideo.style.left = '0';
    grainVideo.style.width = '100vw';
    grainVideo.style.height = '100vh';
    grainVideo.style.zIndex = '1000';
    grainVideo.style.pointerEvents = 'none';
    grainVideo.style.objectFit = 'cover';
    grainVideo.style.opacity = 0.15; // Valor fixo de opacidade
    grainVideo.style.filter = 'invert(100%)';
    grainVideo.loop = true;
    grainVideo.autoplay = true;
    document.body.appendChild(grainVideo);
}

export function removeGrain() {
    if (grainVideo) {
        grainVideo.pause();
        grainVideo.remove();
        grainVideo = null;
    }
}