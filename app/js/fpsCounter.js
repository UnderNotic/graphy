let lastCalledTime;
let lastFps = 0;
let counter = 0;

export default function () {
    if (++counter % 60 != 0) {
        return lastFps;
    }
    counter = 0;

    if (!lastCalledTime) {
        lastCalledTime = Date.now();
        return;
    }
    let delta = (Date.now() - lastCalledTime) / 60000;
    lastCalledTime = Date.now();
    return lastFps = Math.round(1 / delta);
}