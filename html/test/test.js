// test methods
function getPokemonsByType(typeName) {
    return Object.values(Pokemon.all_pokemons)
        .filter(pokemon => pokemon.getTypes().find(t => t.type === typeName))
}
function getPokemonsByAttack(attackName) {
    return Object.values(Pokemon.all_pokemons)
        .filter(pokemon => pokemon.getAttacks().find(a => a.name == attackName))
}
function getAttackByType(typeName) {
    return Object.values(Attack.all_attacks)
        .filter(attack => attack.type === typeName);
}
function sortPokemonByName() {
    return Object.values(Pokemon.all_pokemons)
        .sort((a, b) => a.pokemonName.localeCompare(b.pokemonName));
}
function sortPokemonByStamina() {
    return Object.values(Pokemon.all_pokemons)
        .sort((a, b) => b.baseStamina - a.baseStamina);
}
function getWeakestEnemies(attack) {
    return Object.values(Pokemon.all_pokemons)
        .filter(pokemon => {
            const types = pokemon.getTypes();
            const efficacite = types.reduce((pc, cv) => {
                pc = pc * Type.efficaciteType(attack.type, cv.type);
                return pc;
            }, 1);
            return efficacite > 1;
        });
}

function getBestAttackTypesForEnemy(name) {
    const pokemon = Object.values(Pokemon.all_pokemons).find(pokemon => pokemon.pokemonName === name);
    const typePok = pokemon?.getTypes() ?? [];

    return Object.values(Attack.all_attacks)
        .filter(attack => {
            const efficacite = typePok.reduce((pc, cv) => {
                pc = pc * Type.efficaciteType(attack.type, cv.type);
                return pc;
            }, 1);
            return efficacite > 1;
        });
}

// List of tests
const TESTS = [
    {
        name: "Récupérer un pokemon par type",
        action: () => {
            const type = prompt("Entrer le nom du type");
            console.log(`Liste des pokemons pour le type ${type}`)
            console.table(getPokemonsByType(type));
        }
    },
    {
        name: "Récupérer les pokemons par une attaque",
        action: () => {
            const attack = prompt("Entrer le nom de l'attaque");
            console.log(`Liste des pokemons pour l'attaque ${attack}`)
            console.table(getPokemonsByAttack(attack));
        }
    },
    {
        name: "Récupérer les attaques par le type",
        action: () => {
            const type = prompt("Entrer le nom du type");
            console.log(`Liste des attaques pour le type ${type}`)
            console.table(getAttackByType(attack));
        }
    },
    {
        name: "Trier les pokemons par le name",
        action: () => {
            console.log('Trier les pokemons par le name')
            console.table(sortPokemonByName());
        }
    },
    {
        name: "Trier les pokemons par leur stamina",
        action: () => {
            console.log('Trier les pokemons par leur stamina')
            console.table(sortPokemonByStamina());
        }
    },
    {
        name: "Récupérer les enemies les plus faibles pour une attaque",
        action: () => {
            const attackName = prompt("Nom de l'attaque");
            const attack = Attack.all_attacks[attackName];
            if (!attack)
                return alert("Attaque introuvable.");
            console.log(`Récupérer les enemies les plus faibles pour l'attaque ${attack.names}`)
            console.table(getWeakestEnemies(attack));
        }
    },
    {
        name: "Récupérer les meilleures types d'attaque pour un pokemon",
        action: () => {
            const pokemonName = prompt("Entrer le nom du pokemon");
            console.log(`Meilleures type d'attaque pour ${pokemonName}`);
            console.table(getBestAttackTypesForEnemy(pokemonName));
        }
    }
];

// test integration automatisation 
const testsField = document.getElementById("tests");
TESTS.forEach(({ name, action }, index) => {
    const aElement = document.createElement("a");
    const liElement = document.createElement("li");

    aElement.textContent = `${index + 1} - ${name}`;
    aElement.onclick = action;
    liElement.append(aElement);
    testsField.append(liElement);
});
