class Pokemon {

    static all_pokemons = new Map();

    constructor({ pokemon_id, pokemon_name, form, base_attack, base_defense, base_stamina }) {
        this._pokemonId = pokemon_id;
        this._pokemonName = pokemon_name;
        this._form = form;
        this._base_attack = base_attack;
        this._base_defense = base_defense;
        this._base_stamina = base_stamina;
    }

    get pokemonId() {
        return this._pokemonId;
    }

    getAttack() {
        const moves = pokemon_moves
            .find(({pokemon_id}) => pokemon_id === this.pokemonId)
            .reduce((pc, { charged_moves, fast_moves, elite_charged_moves, elite_fast_moves }) => 
                pc.push(...new Set([...charged_moves, ...fast_moves, ...elite_charged_moves, ...elite_fast_moves]))
            , []);
w   
        return moves.map(move =>
            Object.values(Attack.all_attacks)
                .find(attack => attack.name === move)
        );
    }

    getTypes() {

    }

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
        .filter(({ form }) => form === "Normal")
        .forEach(pokemon => {
            Pokemon.all_pokemons.set(
                pokemon.pokemon_id,
                new Pokemon(pokemon)
            );

        });

    pokemon_types
        .filter(({ form }) => form === "Normal")
        .forEach(pokemon => {
            Type.all_type.set(
                pokemon_types.type,
                new Type(pokemon)
            );
        });
}