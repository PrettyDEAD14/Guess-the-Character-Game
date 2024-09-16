const characters = {
    mcu: [
        { name: 'Iron Man', hint: 'Leader of the Avengers and billionaire genius', img: "./images/Iron Infinity Man.jpg" },
        { name: 'Thor', hint: 'God of Thunder', img: './images/Thor Ragnarok.jpg' },
        { name: 'Captain America', hint: 'Language!!', img: "./images/Cap.png" },
        // Add more MCU characters...
    ],
    comics: [
        { name: 'Wolverine', hint: 'Has claws and healing powers', img: "./images/logan_tFztpIgu5n8.jpg" },
        { name: 'Spider-Man', hint: 'Your friendly neighborhood...', img: './images/Spider-man.jpg' },
        { name: 'Black Widow', hint: 'Ex Assasin and best spy', img: './images/Marvel 10 years poster Black Widow.jpg' },
        // Add more comic characters...
    ],
    mix: [
        { name: 'Wolverine', hint: 'Has claws and healing powers', img: './images/logan_tFztpIgu5n8.jpg' },
        { name: 'Spider-Man', hint: 'Your friendly neighborhood...', img: './images/Spider-man.jpg' },
        { name: 'Black Widow', hint: 'Ex Assasin and best spy', img: './images/Marvel 10 years poster Black Widow.jpg' },
        { name: 'Iron Man', hint: 'Leader of the Avengers and billionaire genius', img: "./images/Iron Infinity Man.jpg" },
        { name: 'Thor', hint: 'God of Thunder', img: './images/Thor Ragnarok.jpg' },
        { name: 'Captain America', hint: 'Language!!', img: "./images/Cap.png" },
        // Add both MCU and comic characters...
    ]
};


let currentCategory = 'mcu';
let currentCharacter = null;
let score = 0;

// Populate the custom dropdown with character names and images
function populateDropdown() {
    const dropdownContent = document.getElementById('dropdown-content');
    dropdownContent.innerHTML = ''; // Reset dropdown content

    characters[currentCategory].forEach(character => {
        const option = document.createElement('div');
        option.classList.add('dropdown-option');
        option.innerHTML = `<img src="${character.img}" class="thumbnail"> ${character.name}`;
        option.addEventListener('click', function () {
            document.getElementById('dropdown-btn').innerHTML = `<img src="${character.img}" class="thumbnail"> ${character.name}`;
            currentCharacter = character; // Set the selected character
        });
        dropdownContent.appendChild(option);
    });
}

// Toggle the custom dropdown display
document.getElementById('dropdown-btn').addEventListener('click', function () {
    document.getElementById('dropdown-content').classList.toggle('show');
});

document.getElementById('category').addEventListener('change', function () {
    currentCategory = this.value;
    startGame();
});

document.getElementById('guess-btn').addEventListener('click', function () {
    if (currentCharacter) {
        const selectedCharacterName = currentCharacter.name.toLowerCase();
        const correctCharacterName = document.getElementById('character-image').getAttribute('data-name').toLowerCase();

        if (selectedCharacterName === correctCharacterName) {
            score++;
            document.getElementById('score').textContent = `Score: ${score}`;
            alert('Correct!');
            startGame();
        } else {
            alert('Incorrect, try again!');
        }
    } else {
        alert('Please select a character from the dropdown.');
    }
});

document.getElementById('hint-btn').addEventListener('click', function () {
    const currentHint = document.getElementById('character-image').getAttribute('data-hint');
    document.getElementById('hint').textContent = `Hint: ${currentHint}`;
});

function startGame() {
    // Select a random character from the chosen category
    const randomIndex = Math.floor(Math.random() * characters[currentCategory].length);
    const character = characters[currentCategory][randomIndex];

    // Set the image and data attributes for the current character
    document.getElementById('character-image').src = character.img;
    document.getElementById('character-image').setAttribute('data-name', character.name); // Store the character's name
    document.getElementById('character-image').setAttribute('data-hint', character.hint); // Store the character's hint

    // Reset hint and dropdown selection
    document.getElementById('hint').textContent = '';
    document.getElementById('dropdown-btn').innerHTML = 'Select the character';
   
    // Populate the dropdown again for the new game
    populateDropdown();
}

// Initialize the game
startGame();