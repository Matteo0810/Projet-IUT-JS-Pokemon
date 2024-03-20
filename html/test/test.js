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
        .filter(pokemon =>
            pokemon.getAttacks()
                .some(a => 
                    Type.efficaciteType(a.type, attack.type) < 1
                )
        )
}
function getStrongestEnemies(attack) {
    return Object.values(Pokemon.all_pokemons)
        .filter(pokemon =>
            pokemon.getAttacks()
                .some(a => 
                    Type.efficaciteType(a.type, attack.type) > 1
                )
        )
}

function getBestAttackTypesForEnemy(name) {
    // @todo
}

/* TESTS */
import_pokemon();


console.log("Get pokemon by type 'Bug':");
console.table(getPokemonsByType("Bug"));

console.log("Get pokemons by attack 'Tackle':");
console.table(getPokemonsByAttack("Tackle"));

console.log("Get attack by type 'Bug':");
console.table(getAttackByType("Bug"));

console.log("Sort pokemon by name:");
console.table(sortPokemonByName());

console.log("Sort pokemon by stamina:");
console.table(sortPokemonByStamina());

console.log("Get weakest enemies:");
console.table(getWeakestEnemies(Attack.all_attacks["Power Whip"]));

console.log("Get strongest enemies:");
console.table(getStrongestEnemies(Attack.all_attacks["Tackle"]));