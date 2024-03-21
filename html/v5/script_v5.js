const pokemonsElement = document.getElementById("pokemons");

// format pokemon path
function formatPath(pokemonId) {
    pokemonId = pokemonId.toString().padStart(3, "0");
    return `../webp/thumbnails/${pokemonId}.webp`;
}

const pokemonList = Object.values(Pokemon.all_pokemons);


// filters names
let typeSelected, 
    generationSelected, 
    nameEntered;


// pagination section
const LIMIT = 25;

let page = 0;
let limit = LIMIT, offset = 0;

const maxPages = Math.ceil(pokemonList.length/LIMIT);

document.getElementById("prev")?.addEventListener("click", () => {
    if(page < 1)
        return;
    page--;
    updatePagination();
});
document.getElementById("next")?.addEventListener("click", () => {
    if(page >= maxPages-1)
        return;
    page++;
    updatePagination();    
});

// update pagination
function updatePagination() {
    offset = page*LIMIT;
    limit = offset+LIMIT;

    updatePaginationText();
    updateList();
}

function updatePaginationText() {
    const paginationText = document.getElementById("paginationText");
    if(paginationText)
        paginationText.textContent = `${page+1}/${maxPages}`;
}

function updateList() {
    const slicedList = pokemonList
        .filter(pokemon => isPokemonCorrespondsTo(pokemon))
        .slice(offset, limit)
        .sort((a, b) => b.pokemonId - a.pokemonId);

    pokemonsElement.innerHTML = "";
    for(const pokemon of slicedList) {
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
}

// init pagination
updateList();
updatePaginationText(); 


// filtres

// elements declarations
const generationsSelector = document.getElementById("generations-selector");
const typesSelector = document.getElementById("types-selector");
const nameFilterInput = document.getElementById("name-input");

// filtre des générations
Object.keys(generation).forEach((name, index) => {
    generationsSelector?.insertAdjacentHTML("afterbegin", `
        <option value="${index+1}">${name}</option>
    `);
    updateList();
})

// filtre par type
Object.keys(Type.all_types).forEach(type => {
    typesSelector?.insertAdjacentHTML("afterbegin", `
        <option value="${type}">${type}</option>
    `);
    updateList();
});

// events
generationsSelector.addEventListener("change", ({target}) => {
    const value = target.value;
    generationSelected = !value ? null : parseInt(value);
    updateList();
    page = 0;
});

typesSelector.addEventListener("change", ({target}) => {
    const value = target.value;
    typeSelected = !value ? null : value; 
    updateList();
    page = 0;
});

nameFilterInput.addEventListener("input", ({target}) => {
    const value = target.value;
    nameEntered = !value?.trim() ? null : value.trim();
    updateList();
    page = 0;
});

/**
 * @description verify that pokemon is corresponding to filters critirias.
 * @param {*} pokemon a provided pokemon
 * @return {Boolean} if the pokemon corresponds or not.
 */
function isPokemonCorrespondsTo(pokemon) {
    // keep only valids criterias
    const criterias = [generationSelected, typeSelected, nameEntered];

    // if no criteria selected then return true always
    if(!criterias.filter(c => c).length)
        return true;

    // otherwise
    return [
        generationSelected && pokemon.getGeneration() === generationSelected,
        typeSelected && pokemon.getTypes().find(t => t.type === typeSelected),
        nameEntered && new RegExp(nameEntered, "i").test(pokemon.pokemonName)
    ].filter(c => c).length === criterias.filter(c => c).length;
}