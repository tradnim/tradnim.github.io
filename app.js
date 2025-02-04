const commands = {
    help: {
        description: "Show available commands",
        execute: () => listCommands()
    },
    projects: {
        description: "Show GitHub projects",
        execute: () => showProjects()
    },
    skills: {
        description: "Show technical skills",
        execute: () => showSkills()
    },
    contact: {
        description: "Show contact information",
        execute: () => showContact()
    }
};

const projects = [
    { name: "Heart-Beat-Simulator", url: "https://github.com/tradnim/Heart-Beat-Simulator" },
    { name: "Ai-Discord-bot-chatbot-v0.9", url: "https://github.com/tradnim/Ai-Discord-bot-chatbot-v0.9" },
    { name: "Incremental-Clicker-v1.5", url: "https://github.com/tradnim/Incremental-Clicker-v1.5" }
];

const skills = ["Python", "lua", "Java", "C++", "Git"];
const contact = { email: "mario.yndart001@mymdc.net", linkedin: "https://www.linkedin.com/in/mario-yndart-377524324/" };

document.getElementById('command-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        processCommand();
    }
});

function processCommand() {
    const input = document.getElementById('command-input');
    const cmd = input.value.trim().toLowerCase();
    input.value = '';
    
    const output = document.getElementById('output');
    output.innerHTML += `<div class="command-response">> ${cmd}</div>`;
    
    if (commands[cmd]) {
        commands[cmd].execute();
    } else {
        output.innerHTML += `<div class="command-response">Command not found. Type 'help' for available commands</div>`;
    }
}

function listCommands() {
    const output = document.getElementById('output');
    let response = "Available commands:<br>";
    for (const [cmd, info] of Object.entries(commands)) {
        response += `${cmd}: ${info.description}<br>`;
    }
    output.innerHTML += `<div class="command-response">${response}</div>`;
}

function showProjects() {
    const output = document.getElementById('output');
    let response = "GitHub Projects:<br>";
    projects.forEach(project => {
        response += `<a href="${project.url}" target="_blank">${project.name}</a><br>`;
    });
    output.innerHTML += `<div class="command-response">${response}</div>`;
}

function showSkills() {
    const output = document.getElementById('output');
    output.innerHTML += `<div class="command-response">Technical Skills: ${skills.join(', ')}</div>`;
}

function showContact() {
    const output = document.getElementById('output');
    let response = `Contact:<br>
    Email: ${contact.email}<br>
    LinkedIn: <a href="https://${contact.linkedin}" target="_blank">${contact.linkedin}</a>`;
    output.innerHTML += `<div class="command-response">${response}</div>`;
}


let audioContext;
let bootSound;
let staticNoise;
let typeSound;

document.getElementById('clickToStart').addEventListener('click', async function() {
    // Initialize audio system
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        await audioContext.resume();
        
        // Load sounds
        bootSound = new Audio('crt-boot.wav');
        staticNoise = new Audio('static.wav');
        typeSound = new Audio('typewriter.wav');
        
        // Configure audio
        staticNoise.loop = true;
        staticNoise.volume = 0.15;
        bootSound.volume = 0.7;
        typeSound.volume = 0.4;

        // Remove click overlay
        this.style.display = 'none';
        document.querySelector('.loading-screen').style.display = 'flex';
        
        // Start boot sequence
        playBootSequence();
    } catch (error) {
        console.error('Audio initialization failed:', error);
        alert('Audio required for proper experience - please enable audio');
    }
});

async function playBootSequence() {
    try {
        // Play boot sound
        await bootSound.play();
        
        // Start hardware check
        simulateHardwareCheck();
        
        // Start static noise after boot sound
        bootSound.onended = () => {
            staticNoise.play().catch(() => {});
            startOSBoot();
        };
    } catch (error) {
        console.error('Boot sequence error:', error);
    }
}

function simulateHardwareCheck() {
    const progressBar = document.querySelector('.boot-progress-bar');
    const memoryTest = document.querySelector('.boot-memory-test');
    let progress = 0;

    // Generate memory test pattern
    memoryTest.textContent = Array(50)
        .fill('0x'+Math.random().toString(16).substr(2,4).toUpperCase())
        .join(' ');

    const updateProgress = () => {
        progress += Math.random() * 15;
        progress = Math.min(progress, 100);
        progressBar.style.width = `${progress}%`;

        if (progress < 100) {
            setTimeout(updateProgress, 200 + Math.random() * 300);
        }
    };

    updateProgress();
}

function startOSBoot() {
    const output = document.getElementById('output');
    const inputLine = document.querySelector('.input-line');
    const terminal = document.querySelector('.terminal');
    
    // Hide loading screen
    document.querySelector('.loading-screen').style.display = 'none';
    terminal.style.visibility = 'visible';

    // Boot messages
    const bootMessages = [
        'MOUNTING SYSTEM PARTITION...',
        'LOADING KERNEL MODULES.....',
        'INITIALIZING DRIVERS......',
        'STARTING SYSTEM SERVICES..',
        'LAUNCHING USER INTERFACE..',
        'SYSTEM READY'
    ];

    bootMessages.forEach((msg, i) => {
        setTimeout(() => {
            output.innerHTML += `<div class="system-message">${msg}</div>`;
            output.scrollTop = output.scrollHeight;
            
            if (i === bootMessages.length - 1) {
                inputLine.style.display = 'flex';
                document.getElementById('command-input').focus();
            }
        }, i * 800);
    });

    // Typing sound effect
    document.getElementById('command-input').addEventListener('keydown', function(e) {
        if (e.key.length === 1 || e.key === 'Backspace') {
            typeSound.currentTime = 0;
            typeSound.play().catch(() => {});
        }
    });

    // CRT flicker effect
    setInterval(() => {
        document.body.style.opacity = Math.random() * 0.1 + 0.9;
    }, 50);
}