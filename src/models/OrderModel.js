export  default  class OrderModel{
    get Order_ID() {
        return this._Order_ID;
    }

    set Order_ID(value) {
        this._Order_ID = value;
    }

    get Customer_ID() {
        return this._Customer_ID;
    }

    set Customer_ID(value) {
        this._Customer_ID = value;
    }

    get Customer_Name() {
        return this._Customer_Name;
    }

    set Customer_Name(value) {
        this._Customer_Name = value;
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

    get Item_qty() {
        return this._Item_qty;
    }

    set Item_qty(value) {
        this._Item_qty = value;
    }

    get Total() {
        return this._Total;
    }

    set Total(value) {
        this._Total = value;
    }
    constructor(Order_ID,Customer_ID,Customer_Name,Item_ID,Description,Unit_Price,Item_qty,Total) {
        this._Order_ID = Order_ID;
        this._Customer_ID = Customer_ID;
        this._Customer_Name =Customer_Name;
        this._Item_ID =Item_ID;
        this._Description =Description;
        this._Unit_Price =Unit_Price;
        this._Item_qty =Item_qty;
        this._Total = Total;
    }
}