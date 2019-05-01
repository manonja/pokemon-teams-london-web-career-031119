const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const mainContainer = document.querySelector('main')


// client
// display card
const displayTrainerCard = (trainer) => {
    let cardEl = document.createElement('div')
    cardEl.className = 'card'
    cardEl.dataset.id = trainer.id


    cardEl.innerHTML = `
            <p>${trainer.name}</p>
            <button data-trainer-id="${trainer.id}">Add Pokemon</button>
            <ul>
              ${newEl(trainer)}
            </ul>
        `
    const addBtn = cardEl.querySelector('[data-trainer-id]')
    createPoki(addBtn, trainer)
    const deleteBtn = cardEl.querySelectorAll("[data-pokemon-id]")
    releasePoki(deleteBtn)


    mainContainer.append(cardEl)
}

// display cards 
const displayTrainersCard = (trainers) => {
    trainers.forEach(displayTrainerCard)
}

const createPoki = (addBtn, trainer) => {
    addBtn.addEventListener('click', () => { 
        mainContainer.innerHTML = " "
            createPokemon(trainer)
            getTrainers()
                .then(displayTrainersCard)
    })
    
}

const newEl = (trainer) => {
    let newItem = ""
    trainer.pokemons.forEach(el => {
        newItem += `<li>${el.nickname} (${el.species})<button class="release" data-pokemon-id="${el.id}">Release</button></li>`

    })
    return newItem
    
}

const releasePoki = (deleteBtn) => {
    deleteBtn.forEach(btn => {

    btn.addEventListener('click', (e) => { 
        const id = (e.target.getAttribute("data-pokemon-id"))
        deletePokemon(id)
        e.target.parentNode.remove()

    })
})
}


// server
const getTrainers = () => {
    return fetch(TRAINERS_URL)
        .then(resp => resp.json())
}

const createPokemon = (trainer) => {
    return fetch(POKEMONS_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({trainer_id: trainer.id})
    }).then(resp => resp.json())
}

const deletePokemon = (id) => {
    return fetch(`${POKEMONS_URL}/${id}`, {
        method: 'DELETE'
    }).then(resp => resp.json())
    .catch(error => console.log(error))
}

const init = () => {
    getTrainers()
        .then(displayTrainersCard)
}

init()