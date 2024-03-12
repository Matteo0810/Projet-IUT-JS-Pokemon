class Type {

    static all_pokemons = new Map();

    constructor({ form, pokemon_id, pokemon_name, type }) {
        this._form = form;
        this._pokemon_id = pokemon_id;
        this._pokemon_name = pokemon_name;
        this._type = type;
    }


    efficaciteType(typeAttaque, typeDefense) {
        let efficacite = type_effectiveness[typeAttaque];

        if (efficacite != null) {
            efficacite = efficacite[typeDefense];
        }
        return efficacite;
    }

    toString() {
        return {
            form: this._form,
            pokemon_id: this._pokemon_id,
            pokemon_name: this._pokemon_name,
            type: this._type
        }
    }

    /*** Getters et Setters ***/
    get form() {
        return this._form;
    }

    get pokemon_id() {
        return this._pokemon_id;
    }

    get pokemon_name() {
        return this._pokemon_name;
    }

    get type() {
        return this._type;
    }

    set form(form) {
        this._form = form;
    }

    set pokemon_id(pokemonId) {
        this._pokemon_id = pokemonId;
    }

    set pokemon_name(pokemonName) {
        this._pokemon_name = pokemonName;
    }

    set type(type) {
        this._type = type;
    }

}

let type = new Type(pokemon_types[0]);
console.log(type.efficaciteType("Bug", "Dark"));