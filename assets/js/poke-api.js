
const pokeApi = {}

function convertPokemonApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name


    const types = pokemon.types = pokeDetail.types.map((typeSlot)=> typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type


    pokemon.image = pokeDetail.sprites.other.showdown.front_default
             
        return pokemon

}

pokeApi.getPokemonsDetail = (pokemon) => {
   return fetch(pokemon.url).then((response)=> response.json())
            .then(convertPokemonApiDetailToPokemon)

}

pokeApi.getPokemons = (offset = 0, limit = 9) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    
    return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .catch((error) => console.error(error))
    .then ((pokemons) => pokemons.map(pokeApi.getPokemonsDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails)=> pokemonsDetails)
}

