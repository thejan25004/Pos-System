import ItemModel from "../models/ItemModel.js";
import {Item_array} from "../db/database.js";


let selected_item_index = null;

// LOAD TO TABLES
const loadItemTable = () =>{
    $("#itemTableBody").empty();
    Item_array.map((items,index)=>{
        let data = `<tr><td>${items.Item_ID}</td><td>${items.Description}</td><td>${items.Unit_Price}</td><td>${items.qty}</td><td></tr>`;
        $("#itemTableBody").append(data);
    });
}

// CLEAR TEXT FIELD LIST
const cleanTextFields = () =>{
    $('#itemIdofItemPage').val("");
    $('#itemdescriptionofItemPage').val("");
    $('#unitPriceofItemPage').val("");
    $('#qtyofItemPage').val("");

}

// ADD ITEM
$("#addItemBtn").on('click',function () {
    let Item_ID = $("#itemIdofItemPage").val();
    let Description = $("#itemdescriptionofItemPage").val();
    let Unit_Price = $("#unitPriceofItemPage").val();
    let qty = $("#qtyofItemPage").val();


    // regex
    let IdRegex = /^I\d{3}$/; // One capital letter followed by 3 digits
    let descriptionRegex = /^.{5,100}$/; // Allows any character, 5-100 characters long
    const decimalTwoPlacesRegex = /^\d+\.\d{2}$/;
    let numberRegex = /^[0-9]+$/;

    // Validation
    if (!IdRegex.test(Item_ID)) {
        alert("Invalid Item ID . Item Id should be One Capital Letter I  & 3 Numbers long.");
        return;
    }
    else if (!descriptionRegex.test(Description)) {
        alert("Invalid Description. Description should be 5-100 characters long.");
        return;
    }
    else if (!decimalTwoPlacesRegex.test(Unit_Price)) {
        alert("Invalid Unit_Price . Unit_Price match a positive number with up to two decimal places");
        return;
    }
    else if (!numberRegex.test(qty)) {
        alert("Invalid qty . qty should be all Numbers .");
        return;
    }



    let ItemObject = new ItemModel(
        Item_array.length + 1 ,
        Item_ID,
        Description,
        Unit_Price,
        qty
    );

    Item_array.push(ItemObject);

    cleanTextFields();
    loadItemTable();


});


// SELECTED TABLE DETAILS
$("#itemTableBody").on('click','tr',function () {
    selected_item_index = $(this).index();
    let item_details = Item_array[selected_item_index];

    $('#itemIdofItemPage').val(item_details.Item_ID);
    $('#itemdescriptionofItemPage').val(item_details.Description);
    $('#unitPriceofItemPage').val(item_details.Unit_Price);
    $('#qtyofItemPage').val(item_details.qty);

})


// UPDATEITEMS
$("#updateBtn").on('click',function () {
    if (selected_item_index !== null ){
        let Item_ID = $("#itemIdofItemPage").val();
        let Description = $("#itemdescriptionofItemPage").val();
        let Unit_Price = $("#unitPriceofItemPage").val();
        let qty = $("#qtyofItemPage").val();

        let updateItems = new ItemModel(Item_array.length + 1 , Item_ID,Description,Unit_Price,qty)
        Item_array[selected_item_index] = updateItems ;

        loadItemTable();
        cleanTextFields();

        selected_item_index = null;
    }else {
        console.log("No Item selected to Update")
    }
});


// DELETE Items

$("#deleteBtn").on('click',function () {
    if (selected_item_index !== null){
        Item_array.splice(selected_item_index,1);
        loadItemTable();
        cleanTextFields();
        selected_item_index = null;

    } else {
        console.log("No Item Selected To Delete")
    }
});

