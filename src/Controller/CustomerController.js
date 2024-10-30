// import CustomerModel from "../models/CustomerModel.js";
import CustomerModel from "../models/CustomerModel.js";
import {Customer_array, Item_array} from "../db/database.js";

let selected_customer_index = null;


// LOAD TO TABLES
const loadCustomerTable = () => {
    $("#customerTableBody").empty();
    Customer_array.map((item,index) =>{
        let data =  `<tr><td>${item.Customer_ID}</td><td>${item.Customer_Name}</td><td>${item.Customer_Address}</td><td>${item.Customer_Nic}</td><td>${item.Customer_Tel}</td><td>${item.Customer_Gmail}</td></tr>`;
        $("#customerTableBody").append(data);

    });
};

const loadDashboardCustomerTable = () => {
    $("#dashboard_Customer_table").empty();
    Customer_array.map((item, index) => {
        let data = `<tr>
            <td>${item.Customer_ID}</td>
            <td>${item.Customer_Name}</td>
            <td>${item.Customer_Address}</td>
            <td>${item.Customer_Nic}</td>
            <td>${item.Customer_Tel}</td>
            <td>${item.Customer_Gmail}</td>
        </tr>`;
        $("#dashboard_Customer_table").append(data);
    });
};


// CLEAR TEXT FIELD LIST
const cleanTextFields = () =>{
    $('#customerIdOfCustomerPage').val("");
    $('#customerNameOfCustomerPage').val("");
    $('#customerAddress').val("");
    $('#customerNic').val("");
    $('#customerTel').val("");
    $('#customerGmail').val("");
}

// Customer Ids dropdown karaganimata
// function loadCustomerDropdown() {
//     const customerDropdown = $("#customerIdDropdown");
//     customerDropdown.empty(); // Clear existing options
//     Customer_array.forEach(customer => {
//         customerDropdown.append(
//             `<option value="${customer.Customer_ID}">${customer.Customer_ID}</option>`
//         );
//     });
// }

// ADD CUSTOMER
$("#addCustomersbtn").on("click",function () {

    let Customer_ID = $("#customerIdOfCustomerPage").val();
    let Customer_Name = $("#customerNameOfCustomerPage").val();
    let Customer_Address = $("#customerAddress").val();
    let Customer_Nic  = $("#customerNic").val();
    let Customer_Tel = $("#customerTel").val();
    let Customer_Gmail = $("#customerGmail").val();



    // regex
    let nameRegex = /^[A-Za-z]{2,30}$/; // Only letters, 2-30 characters
    let nicRegex = /^\d{12}$/; // 12-digit NIC
    let IdRegex = /^C\d{3}$/; // One capital letter followed by 3 digits
    let mobileRegex = /^[0-9]{10}$/; // 10-digit phone number
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Standard email format
    let addressRegex = /^.{5,100}$/; // Allows any character, 5-100 characters long

    // Validation
    if (!nameRegex.test(Customer_Name)) {
        alert("Invalid First Name. Use only letters (2-30 characters).");
        return;
    }
    else if (!addressRegex.test(Customer_Address)) {
        alert("Invalid Address. Address should be 5-100 characters long.");
        return;
    }
    else if (!nicRegex.test(Customer_Nic)) {
        alert("Invalid National Id. National Id should be 1-12 characters long.");
        return;
    }
    else if (!IdRegex.test(Customer_ID)) {
        alert("Invalid Customer Id. Customer Id should be One Capital Letter C  & 3 Numbers long.");
        return;
    }
    else if (!mobileRegex.test(Customer_Tel)) {
        alert("Invalid Mobile. Enter a 10-digit number.");
        return;
    }
    else if (!emailRegex.test(Customer_Gmail)) {
        alert("Invalid Email. Enter a valid email address.");
        return;
    }




    let CustomerObject = new CustomerModel(
        Customer_array.length + 1,
              Customer_ID,
              Customer_Name,
              Customer_Address,
              Customer_Nic,
              Customer_Tel,
              Customer_Gmail
    );

    Customer_array.push(CustomerObject);

    cleanTextFields();
    loadCustomerTable();
    loadDashboardCustomerTable();

    // $("#customerIdDropdown").val(CustomerObject.Customer_ID);


    // loadCustomerDropdown();

});

// $(document).ready(() => {
//     loadCustomerDropdown();
// });

// SELECT TABLE DETAILS
$("#customerTableBody").on('click','tr',function () {

      selected_customer_index = $(this).index();
      let customer_details = Customer_array[selected_customer_index];

      $('#customerIdOfCustomerPage').val(customer_details.Customer_ID);
      $('#customerNameOfCustomerPage').val(customer_details.Customer_Name);
      $('#customerAddress').val(customer_details.Customer_Address);
      $('#customerNic').val(customer_details.Customer_Nic);
      $('#customerTel').val(customer_details.Customer_Tel);
      $('#customerGmail').val(customer_details.Customer_Gmail);

});

// UPDATE CUSTOMER
$("#updateCustomerbtn").on('click',function () {
    if (selected_customer_index !== null){
        let Customer_ID = $("#customerIdOfCustomerPage").val();
        let Customer_Name = $("#customerNameOfCustomerPage").val();
        let Customer_Address = $("#customerAddress").val();
        let Customer_Nic = $("#customerNic").val();
        let Customer_Tel = $("#customerTel").val();
        let Customer_Gmail = $("#customerGmail").val();

        let updateCustomer = new CustomerModel(Customer_array.length + 1 ,Customer_ID,Customer_Name,Customer_Address,Customer_Nic,Customer_Tel,Customer_Gmail)
        Customer_array[selected_customer_index] = updateCustomer;
        loadCustomerTable();
        loadDashboardCustomerTable();
        cleanTextFields();
        selected_customer_index = null;
    }else {
        console.log("No Customer Selected To Update")
    }
})



// DELETE CUSTOMER

$("#deleteCustomerbtn").on('click',function () {
     if (selected_customer_index !== null){
         Customer_array.splice(selected_customer_index,1);
         loadCustomerTable();
         loadDashboardCustomerTable();
         cleanTextFields();
         selected_customer_index = null;

     } else {
         console.log("No Customer Selected To Delete")
     }
});


