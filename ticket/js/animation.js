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
AnimationHeader.from(".navbar-logo", { x: -200, duration: 2, autoAlpha: 0 });
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

let AnimationBody = gsap.timeline({ repeatDelay: 1 });
AnimationBody.from(".video-container", { y: -200, duration: 4, autoAlpha: 0 });
AnimationBody.from(".events-container", {x:-200,duration:1,autoAlpha:0,scale:0.8, })
AnimationBody.from(".nightTour-container", {y:200,duration:1,autoAlpha:0,scale:0.8, })
AnimationBody.from(".competition-container", {x:200,duration:1,autoAlpha:0,scale:0.8, })
AnimationBody.from(".subscribe-container", {x:-200,duration:1,autoAlpha:0,scale:0.8, })
AnimationBody.from(".giftcard-container", {x:200,duration:1,autoAlpha:0,scale:0.8, })
AnimationBody.from(".footer-container", {y:200,duration:1,autoAlpha:0,scale:0.8, })
AnimationBody.from(".navbar-elements", { x: -200, duration: 1, autoAlpha: 0 });
AnimationBody.from(".header-text", {
  x: -200,
  duration: 1,
  autoAlpha: 0,
  stagger: { each: 0.3 },
});


AnimationBody.from(".navbar-links,.app-navbar-links", {
  x: -200,
  duration: 1,
  autoAlpha: 0,
  stagger: { each: 0.3 },
});


  })
}
export {animation}



