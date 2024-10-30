import {Customer_array, Item_array} from "../db/database.js";

let CustomerId_Drop_Down = $("#inputICustomerId");
let ItemId_Drop_Down = $("#inputItemsId");
let Customer_Name_O = $("#inputcustomerName");
let Item_Description_O = $("#inputItemModel");
let Item_UnitPrice_O = $("#inputUnitPrice");
let Item_OnHand_O = $("#inputItemquantity");




// customer id eka click kla wita button eke text eka set wenw
$("#customerIdDropdown").on("click", "li", function() {
    const selectId = $(this);
    CustomerId_Drop_Down.text(selectId.text());
    Customer_Name_O.val(Customer_array[selectId.text()-1].Customer_Name);
});

// item id eka click kla wita button eke text eka set wenw
$("#itemIdDropdown").on("click", "li", function() {
    const selectId = $(this);
    ItemId_Drop_Down.text(selectId.text());
    Item_Description_O.val(Item_array[selectId.text()-1].Description);
    Item_UnitPrice_O.val(Item_array[selectId.text()-1].Unit_Price);
    Item_OnHand_O.val(Item_array[selectId.text()-1].qty);
});


export let setDataDropdowns = () => {
    // customer ids tika dropdown ekt set wenw
    $("#customerIdDropdown").empty();
    Customer_array.forEach((value,index) => {
        console.log("value.Customer_ID");
        let data = `<li>${value.Customer_ID}</li>`;
        $("#customerIdDropdown").append(data);
    });
    console.log(Customer_array);

    // item ids tika dropdown ekt set wenw
    $("#itemIdDropdown").empty();
    Item_array.map((value,index) => {
        let data = `<li>${value.Item_ID}</li>`;
        $("#itemIdDropdown").append(data);
    });
}

setDataDropdowns();