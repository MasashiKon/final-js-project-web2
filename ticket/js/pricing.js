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


window.addEventListener("DOMContentLoaded", () => {
    // Header visibility Start
    const header = document.querySelector(".navbar-container");
    // const headerText = document.querySelectorAll("navbar-links");
  
    let scrollTrigger = 100;
    window.onscroll = function () {
      if (
        scrollTrigger >= window.scrollY ||
        scrollTrigger >= window.pageYOffset
      ) {
        header.style.backgroundColor = "rgba(255, 255,255, 0.5)";
      } else {
        header.style.backgroundColor = "rgba(255, 255, 255)";
      }
    };
})

const cartItemEl = document.querySelector('.cart-item')
const costTotalEl = document.querySelector(".subtotal")
let costTotal = 0
cartItemEl.textContent = 0
let cart = []
let showCart
let cartItemNum = 0
function addCart(responseData) {
  const addBtns = document.querySelector('.btn-addCart')

  addBtns.forEach(addBtn){
    addBtn.addEventListener('click',function()){
      let qty_general = Number(this.previousSibling.firstchild.lastchild)
      let qty_citizen = Number(this.previousSibling.lastchild.lastchild)
      const thisId = this.parentNode.id
      let total_gen = this.previousSibling.firstchild.firstchild.nextSibling.dataset.generalPrice *qty_general
      let total_cit = this.previousSibling.firstchild.lastchild.dataset.citizenPrice *qty_citizen

      if (cart.length == 0) {
        for (const ticket of responseData) {
          if (thisId == ticket.id && ) {
            ticket['quantity'] = qty_general
            cart.push(ticket)
          }
          
        }
        makeEl(thisId)
        cartItemNum += qty_general

      }
    }
  }
}
