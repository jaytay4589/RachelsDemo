// JavaScript Document
var dragSrcEl = null;
var cart = document.getElementById("cart");
window.onload = init;

function init() {
  var cartArray = getCartArray();
    if (!cartArray) {
      cartArray =[];
      localStorage.setItem("cartArray", cartArray);
    }
    for (var i = 0; i < cartArray.length; i++) {
      var key = cartArray[i];
      var value = localStorage[key];
      addCartToDOM(key, value);
    }
}

function addCartToDOM(key, value) {
  var newFood = document.createElement("li");
  newFood.setAttribute("id", key);
  newFood.setAttribute("class", "food inCart");
  newFood.draggable=true;
  newFood.addEventListener('dragstart', dragFood, false);
  newFood.addEventListener('dragend', deleteFood, false);
  newFood.innerHTML = value;
  cart.appendChild(newFood);
  updateCart();
}                           

function getCartArray() {
  var cartArray = localStorage.getItem("cartArray");
    if (!cartArray) {
      cartArray = [];
      localStorage.setItem("cartArray", JSON.stringify(cartArray));
    } else {
      cartArray = JSON.parse(cartArray);
    }
    return cartArray;
}

function dragFood(event) {
  food = event.target 
  dragSrcEl = food;
  event.dataTransfer.setData('food', food.id);
  event.dataTransfer.setData('text/html', this.innerHTML);
}

function drop(event) {
  event.preventDefault();
  var cartArray = getCartArray();
  var currentDate= new Date();
  var key = "food_"+ currentDate.getTime();
  var value = dragSrcEl.innerHTML;
  localStorage.setItem(key, value);
  cartArray.push(key);
  localStorage.setItem("cartArray", JSON.stringify(cartArray));
  addCartToDOM(key, value);
} 
   
   function updateCart() { 
    var totalPrice = document.getElementById("total"); 
    var price = 0;
    var priceArray = cart.getElementsByTagName("span");
    for (var i = 0; i < priceArray.length; i++) {
      price = price + parseFloat(priceArray[i].innerHTML);
    }
    var priceCent = price.toFixed(2);
    totalPrice.innerHTML = priceCent;     
    }
    
 function deleteFood(event) {
 var key = event.target.id;
 localStorage.removeItem(key);
 var cartArray = getCartArray();
 if (cartArray) {
  for (var i = 0; i < cartArray.length; i++) {
    if (key == cartArray[i]) {
      cartArray.splice(i,1);
    }
  }
  localStorage.setItem("cartArray", JSON.stringify(cartArray));
  removeCartFromDOM(key);
 }
}      
    
function removeCartFromDOM(key) {
  var cartDel = document.getElementById(key);
  cartDel.parentNode.removeChild(cartDel);
  updateCart();
}   