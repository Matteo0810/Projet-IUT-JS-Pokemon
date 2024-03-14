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


/* TESTS */
import_pokemon();


console.log("Pokemon by type: ", getPokemonsByType("Bug"));
console.log("Pokemon by attack:", getPokemonsByAttack("Tackle"));
console.log("Attack by type: ", getAttackByType("Bug"));
console.log("Sort by pokemon name: ", sortPokemonByName());
console.log("Sort by pokemon stamina: ", sortPokemonByStamina());
console.log("Get weakest enemies: ", getWeakestEnemies(Attack.all_attacks["Power Whip"]));
console.log("Get strongest enemies: ", getStrongestEnemies(Attack.all_attacks["Tackle"]));