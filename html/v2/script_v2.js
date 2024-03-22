const pokemonsElement = document.getElementById("pokemons");

// format pokemon path
function formatPath(pokemonId) {
    pokemonId = pokemonId.toString().padStart(3, "0");
    return `../webp/thumbnails/${pokemonId}.webp`;
}

const pokemonList = Object.values(Pokemon.all_pokemons);

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
    // clear html element and put pokemons again
    pokemonsElement.innerHTML = "";
    const slicedList = pokemonList
        .slice(offset, limit)
        .sort((a, b) => b.pokemonId - a.pokemonId);
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