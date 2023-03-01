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
  .from(".detailsTitle", {
    autoAlpha: 0,
    yPercent: 10,
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
  end: () => "+=" + document.querySelector(".eventHero").offsetHeight * 6,
  scrub: 1,
  pin: true,
  anticipatePin: 1,
});
