let dashboardForm = $("#DASHBOARD");
let customerForm = $("#CUSTOMER");
let itemForm = $("#ITEMS");
let orderForm = $("#ORDERS");

customerForm.css("display","none");
itemForm.css("display","none");
orderForm.css("display","none");

$("#dashboard-nav").on('click',function (){
    dashboardForm.css("display","block");
    customerForm.css("display","none");
    itemForm.css("display","none");
    orderForm.css("display","none");
});

$("#customer-nav").on('click',function (){
    dashboardForm.css("display","none");
    customerForm.css("display","block");
    itemForm.css("display","none");
    orderForm.css("display","none");
});

$("#item-nav").on('click',function (){
    dashboardForm.css("display","none");
    customerForm.css("display","none");
    itemForm.css("display","block");
    orderForm.css("display","none");
});

$("#order-nav").on('click',function (){
    dashboardForm.css("display","none");
    customerForm.css("display","none");
    itemForm.css("display","none");
    orderForm.css("display","block");
});