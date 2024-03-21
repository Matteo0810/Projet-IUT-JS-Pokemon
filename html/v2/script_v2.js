const pokemonsElement = document.getElementById("pokemons");

// format pokemon path
function formatPath(pokemonId) {
    pokemonId = pokemonId.toString().padStart(3, "0");
    return `../webp/thumbnails/${pokemonId}.webp`;
}

const LIMIT = 25;
let offset = 0;

const sortedPokemon = Object.values(Pokemon.all_pokemons).sort((a, b) => b.pokemonId-a.pokemonId);
const currentPokemon = sortedPokemon.slice(offset, LIMIT);

for(const pokemon of sortedPokemon) {
    pokemonsElement?.insertAdjacentHTML("afterbegin", `
        <tr>
            <td>${pokemon.pokemonId}</td>
            <td>${pokemon.pokemonName}</td>
            <td>${pokemon.getGeneration()}</td>
            <td>${pokemon.getTypes().map(t => t.type).join(", ")}</td>
            <td>${pokemon.baseStamina}</td>
            <td>${pokemon.baseAttack}</td>
            <td>${pokemon.baseDefense}</td>
            <td>
                <img alt="${pokemon.pokemonName}" src="${formatPath(pokemon.pokemonId)}" />
            </td>
        </tr>
    `);
}