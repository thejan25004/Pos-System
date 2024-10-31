import ItemModel from "../models/ItemModel.js";
import {Item_array} from "../db/database.js";
import {setDataDropdowns} from "./OrderController.js";

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
$("#addItemBtn").on('click', function () {
    let Item_ID = $("#itemIdofItemPage").val();
    let Description = $("#itemdescriptionofItemPage").val();
    let Unit_Price = $("#unitPriceofItemPage").val();
    let qty = $("#qtyofItemPage").val();

    // regex patterns
    let IdRegex = /^I\d{3}$/; // One capital letter followed by 3 digits
    let descriptionRegex = /^.{5,100}$/; // Allows any character, 5-100 characters long
    const decimalTwoPlacesRegex = /^\d+\.\d{2}$/; // Matches positive number with two decimal places
    let numberRegex = /^[0-9]+$/; // Only numbers

    // Validation using SweetAlert
    if (!IdRegex.test(Item_ID)) {
        Swal.fire({
            icon: "error",
            title: "Invalid Item ID",
            text: "Item ID should start with 'I' followed by 3 numbers.",
        });
        return;
    }
    if (!descriptionRegex.test(Description)) {
        Swal.fire({
            icon: "error",
            title: "Invalid Description",
            text: "Description should be 5-100 characters long.",
        });
        return;
    }
    if (!decimalTwoPlacesRegex.test(Unit_Price)) {
        Swal.fire({
            icon: "error",
            title: "Invalid Unit Price",
            text: "Unit Price should be a positive number with up to two decimal places.",
        });
        return;
    }
    if (!numberRegex.test(qty)) {
        Swal.fire({
            icon: "error",
            title: "Invalid Quantity",
            text: "Quantity should be a numeric value.",
        });
        return;
    }

    // Show confirmation dialog
    Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
    }).then((result) => {
        // Check if the user confirmed
        if (result.isConfirmed) {
            // Create new Item object and add to array if validation passes
            let ItemObject = new ItemModel(
                Item_array.length + 1,
                Item_ID,
                Description,
                Unit_Price,
                qty
            );

            Item_array.push(ItemObject);

            // Clear input fields, load tables, and dropdowns
            cleanTextFields();
            loadItemTable();
            setDataDropdowns();

            // Show success message with "top-end" position that auto-closes
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Item has been added",
                showConfirmButton: false,
                timer: 1500
            });
        } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
        }
    });
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

// $("#deleteBtn").on('click',function () {
//     if (selected_item_index !== null){
//         Item_array.splice(selected_item_index,1);
//         loadItemTable();
//         cleanTextFields();
//         selected_item_index = null;
//
//     } else {
//         console.log("No Item Selected To Delete")
//     }
// });
// Delete Item Button with Confirmation Alert
$("#deleteBtn").on('click', function () {
    if (selected_item_index !== null) {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                // Delete item and update table
                Item_array.splice(selected_item_index, 1);
                loadItemTable();
                cleanTextFields();
                selected_item_index = null;

                // Show deletion success message
                Swal.fire({
                    title: "Deleted!",
                    text: "Item has been deleted.",
                    icon: "success"
                });
            }
        });
    } else {
        console.log("No Item Selected To Delete");
    }
});

