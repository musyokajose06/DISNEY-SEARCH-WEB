// Accessing the DOM Elements
const searchInput = document.getElementById('search-input')
const searchButton = document.querySelector('.submit')
const clearButton = document.querySelector('.clear')
const charactersGrid = document.querySelector('.characters-grid')

// Clear search results and reset UI
clearButton.addEventListener('click', (event) => {
    event.preventDefault()
    searchInput.value = ''
    charactersGrid.innerHTML = ''
    localStorage.removeItem('lastSearchResults')
})

// Fetching and Displaying Characters
searchButton.addEventListener('click', async (event) => {
    event.preventDefault()
    const query = searchInput.value
    const url = `https://api.disneyapi.dev/character?name=${query}`
    try {
        const response = await fetch(url)
        const data = await response.json()
        displayCharacters(data.data)
        // Local storage
        localStorage.setItem('lastSearchResults', JSON.stringify(data.data))
    } catch (error) {
        console.error('Error fetching characters:', error)
    }
})
// Display characters in the grid
function displayCharacters(characters) {
    charactersGrid.innerHTML = ''
    characters.forEach(character => {
        const characterCard = document.createElement('div')
        characterCard.classList.add('character-card')
        characterCard.innerHTML = `
            <h3>${character.name}</h3>
            <img src="${character.imageUrl}" alt="${character.name}">
            <button class="details-button">Details</button>

        `
        charactersGrid.appendChild(characterCard)
        // Modal - the show modal button
        const detailsButton = characterCard.querySelector('.details-button')
        detailsButton.addEventListener('click', () => {
            modalContent(character)
            modal.classList.add('show')
        })
    })
}

// Modal
const modal = document.getElementById('modal')
const modalButton = document.getElementById('modal-button')

// An event listener to remove the modal
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.classList.remove('show')
    }
})

// Modal Content   
function modalContent(character) {

    const modalContent = document.getElementById('modal-content')
    modalContent.innerHTML = `
        <h1>${character.name}</h1>
        <p>Films: ${character.films.join(', ')}</p>
        <p>Short Films: ${character.shortFilms.join(', ')}</p>
        <p>TV Shows: ${character.tvShows.join(', ')}</p>
        <p>Video Games: ${character.videoGames.join(', ')}</p>
        <p>Park Attractions: ${character.parkAttractions.join(', ')}</p>
        <p>Allies: ${character.allies.join(', ')}</p>
        <p>Enemies: ${character.enemies.join(', ')}</p>
        `
}

// Check for saved results on page load
const savedCharacters = localStorage.getItem('lastSearchResults')
if (savedCharacters) {
    displayCharacters(JSON.parse(savedCharacters))
}
