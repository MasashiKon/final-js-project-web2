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

