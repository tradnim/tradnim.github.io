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