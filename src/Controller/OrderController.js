import { Customer_array, Item_array, Order_array } from "../db/database.js";
import OrderModel from "../models/OrderModel.js";

let selectedCustomerID = null;
let selectedItemID = null;
let orderIndex = 1;  // Track order ID

// Populate dropdowns
export let setDataDropdowns = () => {
    $("#customerIdDropdownList").empty();
    Customer_array.forEach((customer) => {
        const listItem = `<li><a class="dropdown-item" href="#">${customer.Customer_ID}</a></li>`;
        $("#customerIdDropdownList").append(listItem);
    });

    $("#itemIdDropdownList").empty();
    Item_array.forEach((item) => {
        const listItem = `<li><a class="dropdown-item" href="#">${item.Item_ID}</a></li>`;
        $("#itemIdDropdownList").append(listItem);
    });
};

// Handle customer selection -  Customer Ids dropdown karaganimata
$("#customerIdDropdownList").on("click", "a", function () {
    const selectedIndex = $(this).parent().index();
    selectedCustomerID = Customer_array[selectedIndex].Customer_ID;
    $("#inputcustomerName").val(Customer_array[selectedIndex].Customer_Name);
    $("#customerIdDropdown").text(selectedCustomerID);
});

// Handle item selection - Items Id DropDown Karaganna
$("#itemIdDropdownList").on("click", "a", function () {
    const selectedIndex = $(this).parent().index();
    selectedItemID = Item_array[selectedIndex].Item_ID;
    $("#inputItemModel").val(Item_array[selectedIndex].Description);
    $("#inputUnitPrice").val(Item_array[selectedIndex].Unit_Price);
    $("#itemIdDropdown").text(selectedItemID);
});


// Calculate total when quantity is entered
$("#inputQuantity").on("input", function () {
    const quantity = parseInt($(this).val());
    const unitPrice = parseFloat($("#inputUnitPrice").val());

    if (quantity && unitPrice) {
        const total = quantity * unitPrice;
        $("#inputTotal").val(total.toFixed(2));
    }
});


// Save order on button click
$("#saveOrderBtn").on("click", function () {
    const customerName = $("#inputcustomerName").val();
    const itemDescription = $("#inputItemModel").val();
    const unitPrice = parseFloat($("#inputUnitPrice").val());
    const quantity = parseInt($("#inputQuantity").val());
    const total = parseFloat($("#inputTotal").val());

    // Validation check
    if (!selectedCustomerID || !selectedItemID || isNaN(quantity) || isNaN(total)) {
        Swal.fire({
            icon: "error",
            title: "Incomplete Fields",
            text: "Please complete all fields before saving.",
        });
        return;
    }

    // Create a new Order object and add to array
    const newOrder = new OrderModel(
        `O${orderIndex.toString().padStart(3, "0")}`,
        selectedCustomerID,
        customerName,
        selectedItemID,
        itemDescription,
        unitPrice,
        quantity,
        total
    );

    Order_array.push(newOrder);
    orderIndex++;

    // Load the order table and clear the form
    loadOrderTable();
    clearForm();

    // Display custom SweetAlert with image after order is saved
    Swal.fire({
        title: "successfully!",
        text: "Order has been successfully saved.",
        imageUrl: "https://unsplash.it/400/200",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image"
    });
});


// Load order data into the table
const loadOrderTable = () => {
    $("#orderTableBody").empty();
    Order_array.forEach((order) => {
        const row = `
            <tr>
                <td>${order.Order_ID}</td>
                <td>${order.Customer_ID}</td>
                <td>${order.Customer_Name}</td>
                <td>${order.Item_ID}</td>
                <td>${order.Description}</td>
                <td>${order.Unit_Price}</td>
                <td>${order.Item_qty}</td>
                <td>${order.Total}</td>
            </tr>
        `;
        $("#orderTableBody").append(row);
    });
};

// Clear the form after saving
const clearForm = () => {
    $("#customerIdDropdown").text("Select Customer ID");
    $("#itemIdDropdown").text("Select Item ID");
    $("#inputcustomerName").val("");
    $("#inputItemModel").val("");
    $("#inputUnitPrice").val("");
    $("#inputQuantity").val("");
    $("#inputTotal").val("");
};


setDataDropdowns();


// Calculate Sub Total when Discount is entered
$("#inputDiscount").on("input", function () {
    const total = parseFloat($("#inputTotal").val()) || 0;
    const discount = parseFloat($(this).val()) || 0;
    const subTotal = total - discount;
    $("#inputSubTotal").val(subTotal.toFixed(2));
});

// Calculate Balance when Cash is entered
$("#inputCash").on("input", function () {
    const subTotal = parseFloat($("#inputSubTotal").val()) || 0;
    const cash = parseFloat($(this).val()) || 0;
    const balance = cash - subTotal;
    $("#inputBalance").val(balance.toFixed(2));
});

// Update Total based on Quantity and Unit Price
$("#inputQuantity").on("input", function () {
    const quantity = parseInt($(this).val()) || 0;
    const unitPrice = parseFloat($("#inputUnitPrice").val()) || 0;
    const total = quantity * unitPrice;
    $("#inputTotal").val(total.toFixed(2));
    $("#inputDiscount").trigger("input"); // Update Discount and Sub Total if applicable
});



