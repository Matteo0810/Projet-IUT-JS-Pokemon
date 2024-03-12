class Pokemon {

    static all_pokemons = new Map();

    constructor({pokemon_id, pokemon_name, form, base_attack, base_defense, base_stamina}) {
        this._pokemonId = pokemon_id;
        this._pokemonName = pokemon_name;
        this._form = form;
        this._base_attack = base_attack;
        this._base_defense = base_defense;
        this._base_stamina = base_stamina;
    }

    // get getPokemonId() {
    //     return this._pokemonId;
    // }

    // get getPokemonName() {
    //     return this._pokemonName;
    // }

    // get getForm() {
    //     return this._form;
    // }

    // get getBaseAttack() {
    //     return this._base_attack;
    // }

    // get getBaseDefense() {
    //     return this._base_defense;
    // }
    
    // get getBaseStamina() {
    //     return this._base_stamina;
    // }

    // set pokemonId(pokemonId) {
    //     this._pokemonId = pokemonId;
    // }

    toString() {
        return JSON.stringify({
            pokemonId: this._pokemonId,
            pokemonName: this._pokemonName,
            form: this._form,
            baseAttack: this._base_attack,
            baseDefense: this._base_defense,
            baseStamina: this._base_stamina
        })
    }

}

/**
 * @description import all pokemons in a list
 */
function import_pokemon() {
    pokemons
        .filter(({form}) => form === "Normal")
        .forEach(pokemon =>
            Pokemon.all_pokemons.set(
                pokemon.pokemon_id, 
                new Pokemon(pokemon)
            )
        );
}