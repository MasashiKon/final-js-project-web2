const ticketsList = document.querySelector(".tickets-list")
const ticketsTemp = document.querySelector("#ticket-tmp")

async function sendHttpRequest(method,url){
    const { data } = await axios(url,{ method })
    return data
}
async function fetchData(){
    const responseData = await sendHttpRequest("GET","https://gist.githubusercontent.com/ShingoAr1/7586db9b1f8b0a7c507bec071dcb0ccb/raw/57ef51c22c5bea47fc4354a95ad54909c66614cf/fp-ticketprice.json")
    console.log(responseData);
    if (responseData.length > 0) {
        for (const ticket of responseData) {
            const generalPrice = ticket.normal_price.toFixed(2)
            const citizenPrice = ticket.citizen_price.toFixed(2)
            const ticketElClone = document.importNode(ticketsTemp.content,true)
            ticketElClone.querySelector(".category").innerText = ticket.category
            ticketElClone.querySelector(".description").innerText = ticket.description
            ticketElClone.querySelector(".generalPrice").innerText = "$ " + generalPrice
            ticketElClone.querySelector(".citizenPrice").innerText = "$ " +citizenPrice
            ticketElClone.querySelector(".ticket-item").id = ticket.id
            ticketsList.appendChild(ticketElClone)
        }
    }
}

window.addEventListener("DOMContentLoaded",fetchData)

const cartList = document.querySelector('.cartList')
const cartItemEl = document.querySelector('.cart-item')
const subTotalEl = document.querySelector(".subtotal")
let subTotal = 0
cartItemEl.textContent = 0
let cart = []
let showCart
let cartItemNum = 0
function addCart(responseData) {
  const addBtns = document.querySelector('.btn-addCart')

  addBtns.forEach(function(addBtn){
    addBtn.addEventListener('click',function(){
      let qty_general = Number(this.previousSibling.firstchild.lastchild)
      let qty_citizen = Number(this.previousSibling.lastchild.lastchild)
      const thisId = this.parentNode.id
      let total_gen = this.previousSibling.firstchild.firstchild.nextSibling.dataset.generalPrice *qty_general
      let total_cit = this.previousSibling.firstchild.lastchild.dataset.citizenPrice *qty_citizen

      if (cart.length == 0) {
        for (const ticket of responseData) {
          if (thisId == ticket.id) {
            ticket['quantity'] = qty_general
            cart.push(ticket)
          }
        }
        makeEl(thisId)
        cartItemNum += qty_general

        subTotal += total_gen
        subTotalEl.textContent = subTotal.toFixed(2)
        deleteAll()
        return
      }
      while (cartList.firstChild) {
        cartList.removeChild(cartList.firstChild)
      }

      if (checkSame(cart, thisId)) {
        console.log('true Exist')

        for (const ticket of cart) {
          if (thisId == ticket.id) {
            let newGenQty = ticket.qty_general+qty_general
            ticket.qty_general = newGenQty
            updateEl(newQ, thisId)
          }
        }

        subTotal += total_gen
        subTotalEl.textContent = subTotal.toFixed(2)
      } else {
        console.log('not exist')
        for (const product of products) {
          if (thisId == product.id) {
            product['quantity'] = qty_general
            cart.push(ticket)
          }
        }
        makeEl(thisId)

        subTotal += total_gen
        subTotalEl.textContent = subTotal.toFixed(2)
      }
    })
  })
}

function checkSame(myCart, thisId) {
  let isExist = false
  showMyCart = new Set(myCart)
  showMyCart.forEach((item) => {
    if (item.id == thisId) {
      isExist = true
      return
    }
  })
  return isExist
}

function makeEl() {
  cart.forEach((cartItem) => {
    if (cartItem.qty_general != 0) {
      const price = cartItem.price.toFixed(2)
      const cartElClone = document.importNode(cartTemplate.content, true)
      cartElClone.querySelector('.cart-box__item-name').textContent =
        cartItem.title
      cartElClone.querySelector('.cart-box__item-price span').textContent =
        price
      cartElClone.querySelector('.cart-box__item-quantity span').textContent =
        cartItem.quantity
      cartElClone
        .querySelector('.cart-box__img')
        .setAttribute('src', cartItem.image)
      cartElClone.querySelector('.cart-box__item-info')
      cartElClone.querySelector('.cart-box__item').id = cartItem.id
      cartList.appendChild(cartElClone)
    }
  })
}
