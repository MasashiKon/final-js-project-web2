const eventCard = document.querySelector("template");

const tl = gsap.timeline({ defaults: { autoAlpha: 0 } });
tl.from(".two", { xPercent: -100 })
  .from(".three", {
    yPercent: -100,
  })
  .from(".four", {
    xPercent: 100,
    onComplete: () => {
      document.querySelector(".scrolldown").classList.add("hidden");
    },
  })
  .to(
    ".eventTitle",
    {
      autoAlpha: 0,
      y: -10,
    },
    "<"
  )
  .from(".eventDetails", {
    y: 50,
    autoAlpha: 0,
  });

gsap.registerPlugin(ScrollTrigger);
gsap.defaults({ ease: "none", duration: 3 });

ScrollTrigger.create({
  animation: tl,
  trigger: ".body2",
  start: "top, top",
  end: () => "+=" + document.querySelector(".eventHero").offsetHeight * 5,
  scrub: 1,

  pin: true,
  anticipatePin: 1,
  snap: 1 / 4,
});

const nav = document.querySelector("header");
let scrollTrigger = document.querySelector(".eventHero").offsetHeight * 5;
window.onscroll = function () {
  if (scrollTrigger >= window.scrollY || scrollTrigger >= window.pageYOffset) {
    nav.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
  } else {
    nav.style.backgroundColor = "rgb(255, 255, 255)";
  }
};

// const renderEvent()=function(data){

// }
async function getEventData() {
  const res = await fetch(
    "https://run.mocky.io/v3/45e15324-bb03-4d63-8a63-f184214fd47d"
  );
  const json = await res.json();
  // 処理 json.xxxx〜
  console.log(json);

  json.forEach((event) => {
    const eventCardClone = document.importNode(eventCard.content, true);
    eventCardClone.querySelector(".eTitle").textContent = event.eventtitle;
    eventCardClone.querySelector(
      ".imgContainer"
    ).style.background = `url(${event.image}) no-repeat center/cover`;
    eventCardClone.querySelector(".eDetails").textContent = event.eventdetails;

    document.querySelector(".eventCardsContainer").append(eventCardClone);
  });
}

getEventData();

const header = document.querySelector("header");
const body = document.querySelector("body");

body.prepend(header);

let tl2 = gsap.timeline({ defaults: { y: 50, autoAlpha: 0 } });
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({ scrub: 1 });
