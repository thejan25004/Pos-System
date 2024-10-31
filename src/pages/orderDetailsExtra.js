// import {Customer_array, Item_array} from "../db/database.js";
// import OrderModel from "../models/OrderModel.js";
//
// let CustomerId_Drop_Down = $("#inputICustomerId");
// let ItemId_Drop_Down = $("#inputItemsId");
// let Customer_Name_O = $("#inputcustomerName");
// let Item_Description_O = $("#inputItemModel");
// let Item_UnitPrice_O = $("#inputUnitPrice");
// // let Item_OnHand_O = $("#inputItemquantity");
//
//
//
//
// // customer id eka click kla wita button eke text eka set wenw
// $("#customerIdDropdown").on("click", "li", function() {
//     const selectId = $(this);
//     const selectedIndex = selectId.index(); // Get the index of the clicked li
//
//     CustomerId_Drop_Down.text(selectId.text());
//     Customer_Name_O.val(Customer_array[selectedIndex].Customer_Name);
// });
//
// // item id eka click kla wita button eke text eka set wenw
// $("#itemIdDropdown").on("click", "li", function() {
//     const selectId = $(this);
//     const selectedIndex = selectId.index(); // Get the index of the clicked li
//
//     ItemId_Drop_Down.text(selectId.text());
//     Item_Description_O.val(Item_array[selectedIndex].Description);
//     Item_UnitPrice_O.val(Item_array[selectedIndex].Unit_Price);
//     // Item_OnHand_O.val(Item_array[selectedIndex].qty);
// });
//
//
// export let setDataDropdowns = () => {
//     // customer ids tika dropdown ekt set wenw
//     $("#customerIdDropdown").empty();
//     Customer_array.forEach((value,index) => {
//         console.log("value.Customer_ID");
//         let data = `<li>${value.Customer_ID}</li>`;
//         $("#customerIdDropdown").append(data);
//     });
//     console.log(Customer_array);
//
//     // item ids tika dropdown ekt set wenw
//     $("#itemIdDropdown").empty();
//     Item_array.map((value,index) => {
//         let data = `<li>${value.Item_ID}</li>`;
//         $("#itemIdDropdown").append(data);
//     });
// }
//
// setDataDropdowns();


// =================================================================================================================================================================


//
//
// import { Customer_array, Item_array, Order_array } from "../db/database.js";
// import OrderModel from "../models/OrderModel.js";
//
// let selectedCustomerID = null;
// let selectedItemID = null;
// let orderIndex = 1;  // Track order ID
//
// // Populate dropdowns
// export let setDataDropdowns = () => {
//     $("#customerIdDropdownList").empty();
//     Customer_array.forEach((customer) => {
//         const listItem = `<li><a class="dropdown-item" href="#">${customer.Customer_ID}</a></li>`;
//         $("#customerIdDropdownList").append(listItem);
//     });
//
//     $("#itemIdDropdownList").empty();
//     Item_array.forEach((item) => {
//         const listItem = `<li><a class="dropdown-item" href="#">${item.Item_ID}</a></li>`;
//         $("#itemIdDropdownList").append(listItem);
//     });
// };
//
// // Handle customer selection
// $("#customerIdDropdownList").on("click", "a", function () {
//     const selectedIndex = $(this).parent().index();
//     selectedCustomerID = Customer_array[selectedIndex].Customer_ID;
//     $("#inputcustomerName").val(Customer_array[selectedIndex].Customer_Name);
//     $("#customerIdDropdown").text(selectedCustomerID);
// });
//
// // Handle item selection
// $("#itemIdDropdownList").on("click", "a", function () {
//     const selectedIndex = $(this).parent().index();
//     selectedItemID = Item_array[selectedIndex].Item_ID;
//     $("#inputItemModel").val(Item_array[selectedIndex].Description);
//     $("#inputUnitPrice").val(Item_array[selectedIndex].Unit_Price);
//     $("#itemIdDropdown").text(selectedItemID);
// });
//
// // Calculate total when quantity is entered
// $("#inputQuantity").on("input", function () {
//     const quantity = parseInt($(this).val());
//     const unitPrice = parseFloat($("#inputUnitPrice").val());
//
//     if (quantity && unitPrice) {
//         const total = quantity * unitPrice;
//         $("#inputTotal").val(total.toFixed(2));
//     }
// });
//
// // Save order on button click
// $("#saveOrderBtn").on("click", function () {
//     const customerName = $("#inputcustomerName").val();
//     const itemDescription = $("#inputItemModel").val();
//     const unitPrice = parseFloat($("#inputUnitPrice").val());
//     const quantity = parseInt($("#inputQuantity").val());
//     const total = parseFloat($("#inputTotal").val());
//
//     if (!selectedCustomerID || !selectedItemID || isNaN(quantity) || isNaN(total)) {
//         alert("Please complete all fields before saving.");
//         return;
//     }
//
//     const newOrder = new OrderModel(
//         `O${orderIndex.toString().padStart(3, "0")}`,
//         selectedCustomerID,
//         customerName,
//         selectedItemID,
//         itemDescription,
//         unitPrice,
//         quantity,
//         total
//     );
//
//     Order_array.push(newOrder);
//     orderIndex++;
//     loadOrderTable();
//     clearForm();
// });
//
// // Load order data into the table
// const loadOrderTable = () => {
//     $("#orderTableBody").empty();
//     Order_array.forEach((order) => {
//         const row = `
//             <tr>
//                 <td>${order.Order_ID}</td>
//                 <td>${order.Customer_ID}</td>
//                 <td>${order.Customer_Name}</td>
//                 <td>${order.Item_ID}</td>
//                 <td>${order.Description}</td>
//                 <td>${order.Unit_Price}</td>
//                 <td>${order.Item_qty}</td>
//                 <td>${order.Total}</td>
//             </tr>
//         `;
//         $("#orderTableBody").append(row);
//     });
// };
//
// // Clear the form after saving
// const clearForm = () => {
//     $("#customerIdDropdown").text("Select Customer ID");
//     $("#itemIdDropdown").text("Select Item ID");
//     $("#inputcustomerName").val("");
//     $("#inputItemModel").val("");
//     $("#inputUnitPrice").val("");
//     $("#inputQuantity").val("");
//     $("#inputTotal").val("");
// };
//
// // Initialize the dropdowns
// setDataDropdowns();