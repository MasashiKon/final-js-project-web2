const tl = gsap.timeline();
tl.from(".two", { xPercent: -100 })
  .from(".three", {
    xPercent: 100,
    onComplete: () => {
      document.querySelector(".scrolldown").classList.add("hidden");
    },
  })
  .from(".four", {
    yPercent: -100,
  })
  .to(
    ".eventTitle",
    {
      autoAlpha: 0,
      yPercent: -10,
    },
    "<"
  );

gsap.registerPlugin(ScrollTrigger);
gsap.defaults({ ease: "none", duration: 3 });

ScrollTrigger.create({
  animation: tl,
  trigger: ".eventHero",
  start: "top, top",
  end: () => "+=" + document.querySelector(".eventHero").offsetHeight * 5,
  scrub: 1,
  pin: true,
});

const header = document.querySelector(".navbar-container");
let scrollTrigger = document.querySelector(".eventHero").offsetHeight * 7;
window.onscroll = function () {
  if (scrollTrigger >= window.scrollY || scrollTrigger >= window.pageYOffset) {
    header.style.backgroundColor = "rgb(64, 66, 88,0.5)";
  } else {
    header.style.backgroundColor = "rgb(64, 66, 88)";
  }
};
