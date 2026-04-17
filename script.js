const form = document.getElementById("search-form")
const input = document.getElementById("search-input")
const result = document.getElementById("result")
const error = document.getElementById("error")

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const word = input.value.trim()
    if (!word) {
        error.textContent = ("Please enter a word.")
        return;
    }
    
    clearError();
    getWord(word);

});

async function getWord(word) {
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        if (!response.ok) {
            throw new Error("Your word has not been found.");
        }
        const data = await response.json()
        displayWord(data[0]);
    } catch (err) {
        showError(err.message);
    }
}

function displayWord(data) {
    result.innerHTML = "";

    const wordElement = document.createElement("h2")
    wordElement.textContent = data.word
    
    const phonetic = document.createElement("h3")
    phonetic.textContent = data.phonetic

    const meanings = data.meanings[0]

    const partOfSpeech = document.createElement("h3")
    partOfSpeech.textContent = meanings.partOfSpeech

    const definition = document.createElement("p")
    definition.textContent = meanings.definitions[0].definition

    const example = document.createElement("p")
    example.textContent = meanings.definitions[0].example || "No example available."

    const synonym = document.createElement("p")
    synonym.textContent = meanings.synonyms.join(", ") || "No synonyms available."

    result.appendChild(wordElement)
    result.appendChild(phonetic)
    result.appendChild(partOfSpeech)
    result.appendChild(definition)
    result.appendChild(example)
    result.appendChild(synonym)
}

function showError(message) {
    error.textContent = message;
    error.classList.remove("hidden");
}

function clearError() {
    error.textContent = "";
    error.classList.add("hidden");
}
