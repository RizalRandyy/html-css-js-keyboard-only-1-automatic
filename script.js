document.addEventListener('keydown', (event) => {
    let key = event.key.toUpperCase();
    let keyElement;

    if (event.code === "Space") {
        keyElement = document.getElementById('key-Space');
        event.preventDefault();
    } else if (event.key === "Escape") {
        keyElement = document.getElementById('key-Escape');
    } else if (event.code === "Backslash") {
        keyElement = document.getElementById("key-oneandhalf")
    } else if (event.code === "Enter") {
        keyElement = document.getElementById('key-Enter');
    } else if (event.code === "Backspace") {
        keyElement = document.getElementById('key-Backspace');
    } else if (event.code === "CapsLock") {
        keyElement = document.getElementById('key-CapsLock');
    } else if (event.code === "Tab") {
        keyElement = document.getElementById('key-Tab');
        event.preventDefault();
    } else if (event.code.startsWith("Shift")) {
        keyElement = document.getElementById('key-ShiftLeft');
    } else if (event.code.startsWith("Control")) {
        keyElement = document.getElementById('key-ControlLeft');
    } else if (event.code.startsWith("Alt")) {
        keyElement = document.getElementById('key-MetaLeft');
        event.preventDefault();
    } else if (event.code.startsWith("Meta")) {
        keyElement = document.getElementById('key-AltLeft');
        event.preventDefault();
    } else if (event.code.startsWith("Arrow")) {
        keyElement = document.getElementById(`key-${event.code}`);
        event.preventDefault();
    } else {
        keyElement = document.getElementById(`key-${key}`);
    }

    if (keyElement) {
        keyElement.classList.add('key--active');
    }
    playSound();
});

document.addEventListener('keyup', (event) => {
    let key = event.key.toUpperCase();
    let keyElement;

    if (event.code === "Space") {
        keyElement = document.getElementById('key-Space');
        event.preventDefault();
    } else if (event.key === "Escape") {
        keyElement = document.getElementById('key-Escape');
    } else if (event.code === "Enter") {
        keyElement = document.getElementById('key-Enter');
    } else if (event.code === "Backslash") {
        keyElement = document.getElementById("key-oneandhalf")
    } else if (event.code === "Backspace") {
        keyElement = document.getElementById('key-Backspace');
    } else if (event.code === "CapsLock") {
        keyElement = document.getElementById('key-CapsLock');
    } else if (event.code === "Tab") {
        keyElement = document.getElementById('key-Tab');
        event.preventDefault();
    } else if (event.code.startsWith("Shift")) {
        keyElement = document.getElementById('key-ShiftLeft');
    } else if (event.code.startsWith("Control")) {
        keyElement = document.getElementById('key-ControlLeft');
    } else if (event.code.startsWith("Alt")) {
        keyElement = document.getElementById('key-MetaLeft');
        event.preventDefault();
    } else if (event.code.startsWith("Meta")) {
        keyElement = document.getElementById('key-AltLeft');
        event.preventDefault();
    } else if (event.code.startsWith("Arrow")) {
        keyElement = document.getElementById(`key-${event.code}`);
        event.preventDefault();
    } else {
        keyElement = document.getElementById(`key-${key}`);
        event.preventDefault();
    }

    if (keyElement) {
        keyElement.classList.remove('key--active');
    }
});

let audioContext = new (window.AudioContext || window.webkitAudioContext)();
let audioBuffer;

fetch('assets/keyboard-sound.mp3')
    .then(response => response.arrayBuffer())
    .then(data => audioContext.decodeAudioData(data))
    .then(buffer => {
        audioBuffer = buffer;
    });

function playSound() {
    let source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start(0);
}

function simulateKeyPress(key) {
    let eventOptions = {
        key: key,
        code: key,
        keyCode: key.charCodeAt(0),
        which: key.charCodeAt(0),
        bubbles: true
    };

    if (key === ' ') {
        eventOptions.key = ' ';
        eventOptions.code = 'Space';
        eventOptions.keyCode = 32;
        eventOptions.which = 32;
    } else if (key === 'Enter') {
        eventOptions.code = 'Enter';
        eventOptions.keyCode = 13;
        eventOptions.which = 13;
    } else if (key === 'Backspace') {
        eventOptions.code = 'Backspace';
        eventOptions.keyCode = 8;
        eventOptions.which = 8;
    } else if (key === 'Tab') {
        eventOptions.code = 'Tab';
        eventOptions.keyCode = 9;
        eventOptions.which = 9;
    } else if (key === 'Shift') {
        eventOptions.code = 'ShiftLeft';
        eventOptions.keyCode = 16;
        eventOptions.which = 16;
    } else if (key === 'Control') {
        eventOptions.code = 'ControlLeft';
        eventOptions.keyCode = 17;
        eventOptions.which = 17;
    } else if (key === 'Alt') {
        eventOptions.code = 'AltLeft';
        eventOptions.keyCode = 18;
        eventOptions.which = 18;
    } else if (key === 'Escape') {
        eventOptions.code = 'Escape';
        eventOptions.keyCode = 27;
        eventOptions.which = 27;
    } else if (key.startsWith('Arrow')) {
        eventOptions.code = key;
        eventOptions.keyCode = key === 'ArrowUp' ? 38 : key === 'ArrowDown' ? 40 : key === 'ArrowLeft' ? 37 : 39;
        eventOptions.which = eventOptions.keyCode;
    }

    let event = new KeyboardEvent('keydown', eventOptions);
    document.dispatchEvent(event);

    setTimeout(() => {
        let eventUp = new KeyboardEvent('keyup', eventOptions);
        document.dispatchEvent(eventUp);
    }, 100); // Adjust delay between keydown and keyup if needed
}

function getRandomKey() {
    const keys = [
        ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        ..."1234567890",
        "Enter", "Backspace", "Tab", "Shift", "Control", "Alt", "Escape", "Space",
        "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"
    ];
    return keys[Math.floor(Math.random() * keys.length)];
}

function startTypingRandomly() {
    setInterval(() => {
        let randomKey = getRandomKey();
        simulateKeyPress(randomKey);
    }, 300); // Adjust interval time as needed
}

startTypingRandomly();
