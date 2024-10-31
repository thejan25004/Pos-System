
import CustomerModel from "../models/CustomerModel.js";
import {Customer_array, Item_array} from "../db/database.js";
import {setDataDropdowns} from "./OrderController.js";
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
$("#addCustomersbtn").on("click", function () {
    let Customer_ID = $("#customerIdOfCustomerPage").val();
    let Customer_Name = $("#customerNameOfCustomerPage").val();
    let Customer_Address = $("#customerAddress").val();
    let Customer_Nic = $("#customerNic").val();
    let Customer_Tel = $("#customerTel").val();
    let Customer_Gmail = $("#customerGmail").val();

    // regex
    let nameRegex = /^[A-Za-z]{2,30}$/; // Only letters, 2-30 characters
    let nicRegex = /^\d{12}$/; // 12-digit NIC
    let IdRegex = /^C\d{3}$/; // One capital letter followed by 3 digits
    let mobileRegex = /^[0-9]{10}$/; // 10-digit phone number
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Standard email format
    let addressRegex = /^.{5,100}$/; // Allows any character, 5-100 characters long

    // Validation with SweetAlert
    if (!nameRegex.test(Customer_Name)) {
        Swal.fire({
            icon: "error",
            title: "Invalid Name",
            text: "Use only letters (2-30 characters).",
        });
        return;
    } else if (!addressRegex.test(Customer_Address)) {
        Swal.fire({
            icon: "error",
            title: "Invalid Address",
            text: "Address should be 5-100 characters long.",
        });
        return;
    } else if (!nicRegex.test(Customer_Nic)) {
        Swal.fire({
            icon: "error",
            title: "Invalid National ID",
            text: "National ID should be exactly 12 digits long.",
        });
        return;
    } else if (!IdRegex.test(Customer_ID)) {
        Swal.fire({
            icon: "error",
            title: "Invalid Customer ID",
            text: "Customer ID should start with 'C' followed by 3 digits.",
        });
        return;
    } else if (!mobileRegex.test(Customer_Tel)) {
        Swal.fire({
            icon: "error",
            title: "Invalid Mobile Number",
            text: "Enter a 10-digit number.",
        });
        return;
    } else if (!emailRegex.test(Customer_Gmail)) {
        Swal.fire({
            icon: "error",
            title: "Invalid Email",
            text: "Enter a valid email address.",
        });
        return;
    }

    // Show confirmation dialog before adding the customer
    Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
    }).then((result) => {
        if (result.isConfirmed) {
            // Create a new Customer object and add it to the array if confirmed
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

            // Additional actions after saving
            cleanTextFields();
            loadCustomerTable();
            loadDashboardCustomerTable();
            setDataDropdowns();

            // Show success message
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Customer has been added",
                showConfirmButton: false,
                timer: 1500
            });
        } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
        }
    });
});


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

// $("#deleteCustomerbtn").on('click',function () {
//      if (selected_customer_index !== null){
//          Customer_array.splice(selected_customer_index,1);
//          loadCustomerTable();
//          loadDashboardCustomerTable();
//          cleanTextFields();
//          selected_customer_index = null;
//
//      } else {
//          console.log("No Customer Selected To Delete")
//      }
// });
$("#deleteCustomerbtn").on('click', function () {
    if (selected_customer_index !== null) {
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
                // Delete customer and update tables
                Customer_array.splice(selected_customer_index, 1);
                loadCustomerTable();
                loadDashboardCustomerTable();
                cleanTextFields();
                selected_customer_index = null;

                // Show deletion success message
                Swal.fire({
                    title: "Deleted!",
                    text: "Customer has been deleted.",
                    icon: "success"
                });
            }
        });
    } else {
        console.log("No Customer Selected To Delete");
    }
});


