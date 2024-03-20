const pokemonsElement = document.getElementById("pokemons");

for(const pokemon of Object.values(Pokemon.all_pokemons)) {
    pokemonsElement?.insertAdjacentHTML("afterbegin", `
        
    `);
}