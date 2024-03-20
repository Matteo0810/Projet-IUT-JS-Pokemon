class Type {

    static all_types = {};

    constructor(type) {
        this._type = type;
    }

    static efficaciteType(typeAttaque, typeDefense) {
        let efficacite = type_effectiveness[typeAttaque];

        if (efficacite != null) {
            efficacite = efficacite[typeDefense];
        }
        return efficacite;
    }

    toString() {
        return {
            type: this._type
        }
    }

    /*** Getters et Setters ***/
    get type() {
        return this._type;
    }

    set type(type) {
        this._type = type;
    }

}

let type = new Type(pokemon_types[0].type[0]);
console.log(Type.efficaciteType("Bug", "Dark"));