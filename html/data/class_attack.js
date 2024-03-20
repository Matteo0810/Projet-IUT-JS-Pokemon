class Attack {

    static all_attacks = {};

    constructor({ name, power, type, stamina_loss_scaler, move_id, energy_data, duration, critical_chance = 0 }) {
        this._moveId = move_id;
        this._name = name;
        this._power = power;
        this._type = type;
        this._staminaLossScaler = stamina_loss_scaler;
        this._energyData = energy_data;
        this._duration = duration;
        this._criticalChange = critical_chance;
    }



    /*** Getters et Setters ***/
    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }

    get power() {
        return this._power;
    }

    set power(power) {
        this._power = power;
    }

    get type() {
        return this._type;
    }

    set type(type) {
        this._type = type;
    }

    get stamina_loss_scaler() {
        return this._staminaLossScaler;
    }

    set stamina_loss_scaler(stamina_loss_scaler) {
        this._staminaLossScaler = stamina_loss_scaler;
    }

    get moveId() {
        return this._moveId;
    }

    set moveId(moveId) {
        this._moveId = moveId;
    }

    get energyData() {
        return this._energyData;
    }

    set energyData(energyData) {
        this._energyData = energyData;
    }

    get duration() {
        return this._duration;
    }

    set duration(duration) {
        this._duration = duration;
    }

    get criticalChange() {
        return this._criticalChange;
    }

    set criticalChange(criticalChange) {
        this._criticalChange = criticalChange;
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