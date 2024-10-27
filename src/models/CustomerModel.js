export default class CustomerModel{
    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
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

    get Customer_Address() {
        return this._Customer_Address;
    }

    set Customer_Address(value) {
        this._Customer_Address = value;
    }

    get Customer_Nic() {
        return this._Customer_Nic;
    }

    set Customer_Nic(value) {
        this._Customer_Nic = value;
    }

    get Customer_Tel() {
        return this._Customer_Tel;
    }

    set Customer_Tel(value) {
        this._Customer_Tel = value;
    }

    get Customer_Gmail() {
        return this._Customer_Gmail;
    }

    set Customer_Gmail(value) {
        this._Customer_Gmail = value;
    }
    constructor(id,Customer_ID,Customer_Name,Customer_Address,Customer_Nic,Customer_Tel,Customer_Gmail) {
        this._id = id;
        this._Customer_ID = Customer_ID;
        this._Customer_Name = Customer_Name
        this._Customer_Address =Customer_Address;
        this._Customer_Nic = Customer_Nic;
        this._Customer_Tel = Customer_Tel;
        this._Customer_Gmail = Customer_Gmail;

    }

}