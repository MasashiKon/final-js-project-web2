const animation = () => {
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
        header.style.transition = "1s"
      }
    };
    let AnimationHeader = gsap.timeline({ repeatDelay: 1 });
AnimationHeader.from(".navbar-logo", { x: -200, duration: 1, autoAlpha: 0 });
AnimationHeader.from(".navbar-container2", { x: -200, duration: 1, autoAlpha: 0 });
AnimationHeader.from(".navbar-item", {
  x: -200,
  duration: 1,
  autoAlpha: 0,
  stagger: { each: 0.3 },
});
AnimationHeader.from(".navbar-ticket", {
  x: 200,
  duration: 1,
  autoAlpha: 0,
});
AnimationHeader.from(".ticket", { scale: 1.2 });




let ticketbodyAnimation = gsap.timeline({repeatDelay:0.5});
ticketbodyAnimation.from(".hero-container h1",{y:-500,duration:1,autoalpha:0})
ticketbodyAnimation.from(".address", { x: -1000, duration: 0.75, autoAlpha: 0 });
ticketbodyAnimation.from(".note", { x: 200, duration: 0.5, autoAlpha: 0 });
ticketbodyAnimation.from(".ticket-container",{y:-1000,duration:1,autoAlpha:0})
ticketbodyAnimation.from(".orderDetail",{y:1000,duration:0.25,autoalpha:0})
ticketbodyAnimation.from(".around-book-button",{y:1000,duration:0.25,autoalpha:0,stagger:{each:0.25}})
  })

 

}
export {animation}



