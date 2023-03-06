const ticketing = () => {
  const ticketsList = document.querySelector(".tickets-list")
  const ticketsTemp = document.querySelector("#ticket-tmp")

  async function sendHttpRequest(method,url){
  const { data } = await axios(url,{ method })
  return data
  }

  // let prevQty_gen = 0
  // let prevQty_cit = 0
  async function fetchData() {
    const responseData = await sendHttpRequest("GET","https://gist.githubusercontent.com/ShingoAr1/7586db9b1f8b0a7c507bec071dcb0ccb/raw/57ef51c22c5bea47fc4354a95ad54909c66614cf/fp-ticketprice.json")
    // console.log(responseData);
    showTickets(responseData)
    incart(responseData)

  }
  window.addEventListener('DOMContentLoaded', fetchData())

  function showTickets(responseData) {
      for (const ticket of responseData) {
          const price = ticket.normal_price.toFixed(2)
          const ticketElClone = document.importNode(ticketsTemp.content,true)
          ticketElClone.querySelector(".category").innerText = ticket.category
          ticketElClone.querySelector(".description").innerText = ticket.description
          ticketElClone.querySelector(".price-value").innerText =price
          ticketElClone.querySelector(".ticket-item").id = ticket.id
          ticketsList.appendChild(ticketElClone)
      }
    }
  


  // -----------------
  // Show Order Detail
  // -----------------

function incart(){
  const deleteButtons = document.querySelectorAll(".cart-delete")
  for(var i = 0; i = deleteButtons.length; i++){
    const deleteButton = deleteButtons[i]
    deleteButton.addEventListener('click',removeFromCart)
  }
  const qtyOnTicket = document.querySelectorAll('.quantity')
  for (let i = 0; i < qtyOnTicket.length; i++) {
    const input = qtyOnTicket[i];
    input.addEventListener('change',avoidBelowZero)
  }

  
  const quantityInputs = document.querySelectorAll('.quantity-incart')
  for (var i = 0; i < quantityInputs.length; i++) {
    const input = quantityInputs[i];
    input.addEventListener('change',quantityChange)

  }
  const addToCartButtons = document.querySelectorAll('.btn-addCart')
  for (let i = 0; i < addToCartButtons.length; i++) {
    const addButton = addToCartButtons[i];
    addButton.addEventListener('click',addToCartClicked)
  }

  document.querySelectorAll('.btn-book')[0].addEventListener('click',purchaseClicked)
}

 function purchaseClicked() {
  const cartItems = document.getElementsByClassName('cart-list')[0]
alert("Thank you for booking our Tickets!!")
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild)
  }
  updateCartTotal()
  

 }

function removeFromCart(event) {
  var buttonClicked = event.target
  buttonClicked.parentElement.parentElement.remove()
  updateCartTotal()
}

function avoidBelowZero(event) {
var input = event.target
if (isNaN(input.value) || input.value < 0) {
    input.value = 0
}
updateCartTotal()
}

function quantityChange(event) {
var input = event.target
if (isNaN(input.value) || input.value <= 0) {
    input.value = 1
}
updateCartTotal()
}

function addToCartClicked(event) {
var button = event.target
var buyTicket = button.parentElement
var category = buyTicket.getElementsByClassName('category')[0].innerText
var price = buyTicket.getElementsByClassName('price')[0].innerText
var quantity = buyTicket.querySelector("input").value
// console.log("Add to cart: "+category,+" "+price+" "+quantity);
if (quantity <= 0) {
  return
}
addItemToCart(category, price,quantity)
updateCartTotal()
  let cartInAnimation = gsap.timeline({repeatDelay:1})
cartInAnimation.from(".cart-item",{ x: -500, duration: 1, autoAlpha: 0 })



}

function addItemToCart(category, price,quantity) {
const cartRow = document.createElement('div')
cartRow.classList.add('cart-container')
const cartItems = document.getElementsByClassName('cart-list')[0]
const cartItemCategories = document.getElementsByClassName('incart-category')
for (var i = 0; i < cartItemCategories.length; i++) {
  if (cartItemCategories[i].innerText == category) {
    alert("You already put "+category+" tickets in the cart. Please select the amount on Order Detail section")
    return
  }
  
  
}
const itemRawContents = `
      <li class="cart-item">
        <h3 class="incart-category">${category}</h3>
          
          <p class="price"><span class="price-value">${price}</span></p>
          <div class="amount-incart">
          <label class="ticket-general">Amount</label>
            <input type="number" class="quantity-incart" value="${quantity}">
          </div>
       <button class="cart-delete"><i class="fa-solid fa-trash-can"></i></button>
      </li> `
      cartRow.innerHTML = itemRawContents
      cartItems.append(cartRow)
      cartRow.getElementsByClassName('cart-delete')[0].addEventListener('click',removeFromCart)
      cartRow.getElementsByClassName('quantity-incart')[0].addEventListener('change',quantityChange)
        
}

function updateCartTotal() {
const cartListContainer = document.getElementsByClassName('cart-list')[0]
const cartRows = cartListContainer.getElementsByClassName('cart-container')
var total = 0 ;
for (var i = 0; i < cartRows.length; i++) {
  var cartRow = cartRows[i]
  var priceEl = cartRow.getElementsByClassName('price-value')[0]
  var qtyEl = cartRow.getElementsByClassName('quantity-incart')[0]
  var price = parseFloat(priceEl.innerText.replace('$','')).toFixed(2)
  var quantity = qtyEl.value
  console.log(price, quantity);
      total = total + (price*quantity)
}
total = Math.round(total * 100) /100
 document.getElementsByClassName('total-price')[0].innerText = total
}

} 
export {ticketing}