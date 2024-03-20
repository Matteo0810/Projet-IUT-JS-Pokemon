class Pokemon {

    static all_pokemons = {};

    constructor({ pokemon_id, pokemon_name, form, base_attack, base_defense, base_stamina }) {
        this._pokemonId = pokemon_id;
        this._pokemonName = pokemon_name;
        this._form = form;
        this._baseAttack = base_attack;
        this._baseDefense = base_defense;
        this._baseStamina = base_stamina;
    }

    get pokemonId() {
        return this._pokemonId;
    }

    get pokemonName() {
        return this._pokemonName;
    }

    get baseStamina() {
        return this._baseStamina;
    }

    getAttacks() {
        const {charged_moves, elite_charged_moves, elite_fast_moves, fast_moves} = pokemon_moves
            .find(({pokemon_id}) => pokemon_id === this.pokemonId)
        const moves = [...new Set([...charged_moves, ...elite_charged_moves, ...elite_fast_moves, ...fast_moves])];

        return moves.map(attackName => 
            Attack.all_attacks[attackName]
        );
    }

    getTypes() {
        const types = pokemon_types.find(({pokemon_id}) => pokemon_id === this.pokemonId);
        return types.type.map(type => Type.all_types[type]);
    }

    toString() {
        return JSON.stringify({
            pokemonId: this._pokemonId,
            pokemonName: this._pokemonName,
            form: this._form,
            baseAttack: this._baseAttack,
            baseDefense: this._baseDefense,
            baseStamina: this._baseStamina
        })
    }

}

/**
 * @description import all pokemons, types and attacks
 */
const MOVES = [...charged_moves, ...fast_moves];
function import_pokemon() {
    pokemons
        .filter(({ form }) => form === "Normal")
        .forEach(pokemon => {
            Pokemon.all_pokemons[pokemon.pokemon_id] = new Pokemon(pokemon);

            // get all attacks of the pokemon, if it's not exists, create it and add it
            const {charged_moves, elite_charged_moves, elite_fast_moves, fast_moves} = pokemon_moves.find(({pokemon_id}) => pokemon_id === pokemon.pokemon_id)
            const moves = [...new Set([...charged_moves, ...elite_charged_moves, ...elite_fast_moves, ...fast_moves])];

            moves.forEach(attackName => {
                Attack.all_attacks[attackName] = new Attack(MOVES.find(({name}) => name === attackName))
            });
            
            // get all types of the pokemon, if it's not exists, create it and add it to the all_types map.
            const pokemonType = pokemon_types
                .filter(({ form }) => form === "Normal")
                .find(({pokemon_id}) => pokemon_id === pokemon.pokemon_id)
            pokemonType.type.forEach(t =>
                Type.all_types[t] = new Type(t)
            )
        });
}