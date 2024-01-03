const quotes = [
    "Don't start a fight if you can't end it",
    'Only those who suffered long can see the light within the shadows',
    'This hat is the most precious thing I own. It means the world to me and I want you to take it',
    'Arlong, you are a fishman. You can never be a human being',
    'I am not alone. I have friends with me',
    'I want to live',
];

const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];
const modalMessage = document.getElementById("modal-message");

// Function to show the modal with a message
function showModal(message) {
    modalMessage.innerText = message;
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


// Store list of words and index of the word the player is currently typing
let words = [];
let wordIndex = 0;

// The starting time
let startTime;

// Elements
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');

// Function to handle the input event
function handleInput() {
    // Get the current word
    const currentWord = words[wordIndex];
    // Get the current value
    const typedValue = typedValueElement.value;

    if (typedValue === currentWord && wordIndex === words.length - 1) {
        // End of sentence - game over
        const elapsedTime = new Date().getTime() - startTime;
        const message = `You finished in ${elapsedTime / 1000} seconds.`;
        showModal(message);
        messageElement.innerText = message;
        //Disable the textbox
        typedValueElement.disabled = true;
        // Disable the input event listener
        typedValueElement.removeEventListener('input', handleInput);
    } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
        // End of word
        typedValueElement.value = '';
        wordIndex++;
        for (const wordElement of quoteElement.childNodes) {
            wordElement.className = '';
        }
        // Highlight the new word
        quoteElement.childNodes[wordIndex].className = 'highlight';
    } else if (currentWord.startsWith(typedValue)) {
        // Currently correct
        typedValueElement.className = '';
    } else {
        // Error state
        typedValueElement.className = 'error';
    }
}

// Start game button click event listener
document.getElementById('start').addEventListener('click', () => {
    // Re-enable the textbox
    typedValueElement.disabled = false;

    // Randomly select a quote
    const quoteIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[quoteIndex];
    // Split the quote into an array of words
    words = quote.split(' ');
    wordIndex = 0;

    // Create an array of span elements for each word
    const spanWords = words.map(function(word) { return `<span>${word} </span>` });
    // Set as innerHTML on quote display
    quoteElement.innerHTML = spanWords.join('');
    // Highlight the first word
    quoteElement.childNodes[0].className = 'highlight';
    // Clear any prior messages
    messageElement.innerText = '';

    // Setup textbox
    typedValueElement.value = '';
    // Set focus
    typedValueElement.focus();
    // Start the timer
    startTime = new Date().getTime();

    // Attach the input event listener
    typedValueElement.addEventListener('input', handleInput);
});
