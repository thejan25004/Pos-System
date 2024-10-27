// import CustomerModel from "../models/CustomerModel.js";
import CustomerModel from "../models/CustomerModel.js";
import {Customer_array} from "../db/database.js";


// LOAD TO TABLES
const loadCustomerTable = () => {
    $("#customerTableBody").empty();
    Customer_array.map((item,index) =>{
        let data =  `<tr><td>${item.Customer_ID}</td><td>${item.Customer_Name}</td><td>${item.Customer_Address}</td><td>${item.Customer_Nic}</td><td>${item.Customer_Tel}</td><td>${item.Customer_Gmail}</td></tr>`;
        $("customerTableBody").append(data);
    });
};


const cleanTextFields = () =>{
    $('#customerIdOfCustomerPage').val("");
    $('#customerNameOfCustomerPage').val("");
    $('#customerAddress').val("");
    $('#customerNic').val("");
    $('#customerTel').val("");
    $('#customerGmail').val("");
}



// ADD CUSTOMER
$("addCustomersbtn").on("click",function () {

    let Customer_ID = $("#customerIdOfCustomerPage").val();
    let Customer_Name = $("#customerNameOfCustomerPage").val();
    let Customer_Address = $("#customerAddress").val();
    let Customer_Nic  = $("#customerNic").val();
    let Customer_Tel = $("#customerTel").val();
    let Customer_Gmail = $("#customerGmail").val();


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

});

