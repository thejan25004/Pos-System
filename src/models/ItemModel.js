export default class ItemModel {
    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get Item_ID() {
        return this._Item_ID;
    }

    set Item_ID(value) {
        this._Item_ID = value;
    }

    get Description() {
        return this._Description;
    }

    set Description(value) {
        this._Description = value;
    }

    get Unit_Price() {
        return this._Unit_Price;
    }

    set Unit_Price(value) {
        this._Unit_Price = value;
    }

    get qty() {
        return this._qty;
    }

    set qty(value) {
        this._qty = value;
    }
    constructor(id,Item_ID,Description,Unit_Price,qty) {
        this._id = id;
        this._Item_ID = Item_ID;
        this._Description = Description;
        this._Unit_Price = Unit_Price;
        this._qty = qty;
    }
}