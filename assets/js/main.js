
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const backButton = document.getElementById('backButton')
const number = document.getElementById('number')


const maxRecords = 493;
const limit = 9;
let offset = 0;

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) =>
            `<li class="pokemon ${pokemon.type}">
                <span class="number">#0${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
            
            
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class ="type" ${type}">${type}</li>`).join('')}
                        
                    </ol>
            
                    <img src="${pokemon.image}" onclick="showPopup('${pokemon.name}', '${pokemon.image}', 
                    '${pokemon.abilities}')" alt="${pokemon.name}">
                       

                        </div>
                </li>

      
            `).join('')
                         
        pokemonList.innerHTML = newHtml
    })
}
    loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {

    const qtdRecord = offset + limit

    if (qtdRecord >= maxRecords) {
        offset = 0
        loadPokemonItens(offset, limit)

    } else {
        offset += limit
        loadPokemonItens(offset, limit)
    }
})

backButton.addEventListener('click', () => {
    if (offset < limit) {
        offset = maxRecords - limit
        loadPokemonItens(offset, limit)
    } else {
        offset -= limit
        loadPokemonItens(offset, limit)
    }

})


 
