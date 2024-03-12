class Attack {

    static all_attacks = new Map();

    constructor({name, power, type, stamina_loss_scaler, move_id, energy_data, duration, critical_chance=0}) {
        this._moveId = move_id;
        this._name = name;
        this._power = power;
        this._type = type;
        this._staminaLossScaler = stamina_loss_scaler;
        this._energyData = energy_data;
        this._duration = duration;
        this._criticalChange = critical_chance;
    }

    get name() {
        return this._name;
    }

    toString() {
        return JSON.stringify({
            moveId: this._moveId,
            name: this._name,
            power: this._power,
            type: this._type,
            staminaLossScaler: this._staminaLossScaler,
            energyData: this._energyData,
            duration: this._duration,
            criticalChance: this._criticalChange
        })
    }

}

function import_attacks() {
    [...charged_moves, ...fast_moves]   
        .forEach(move => {
            Attack.all_attacks.set(
                move.moveId,
                new Attack(move)
            );
        });
}