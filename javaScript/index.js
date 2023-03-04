
window.addEventListener("DOMContentLoaded", () => {
  video.src = videos[0];
  // Header visibility Start
  const header = document.querySelector(".navbar-container");

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
  // Header visibility End

  // Slider Clip Start

  setInterval(function () {
    for (let i = 0; i <= lastVideo; i++) {
      if (currentVideo === lastVideo) {
        currentVideo = 0;
        return (video.src = `${videos[currentVideo]}`);
      }
      currentVideo += 1;
      return (video.src = `${videos[currentVideo]}`);
    }
  }, 5000);
});

function videoClips() {
  document.querySelector(".video-clip").src;
}
// Animals
const videos = [
  "/Assets/video1/bear.mp4",
  "/Assets/video3/flamingo.mp4",
  "/Assets/video4/zebra.mp4",
  "/Assets/video3/penguins.mp4",
  "/Assets/video4/rhino.mp4",
  "/Assets/video1/barbary-macaque.mp4",
  "/Assets/video2/croco.mp4",
  "/Assets/video2/giraffe.mp4",
];

const video = document.querySelector(".video-clip");
const nextBtn = document.querySelector(".right-btn");
const prevBtn = document.querySelector(".left-btn");
const lastVideo = videos.length - 1;
let currentVideo = 0;

nextBtn.addEventListener("click", () => {
  for (let i = 0; i <= lastVideo; i++) {
    if (currentVideo === lastVideo) {
      currentVideo = 0;
      return (video.src = `${videos[currentVideo]}`);
    }
    currentVideo += 1;
    return (video.src = `${videos[currentVideo]}`);
  }
});

prevBtn.addEventListener("click", () => {
  for (let i = 0; i <= lastVideo; i++) {
    if (currentVideo === 0) {
      currentVideo = lastVideo;
      return (video.src = `${videos[currentVideo]}`);
    }
    currentVideo -= 1;
    return (video.src = `${videos[currentVideo]}`);
  }
});

// Slider Clip End

// Animation
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
AnimationBody.from(".events-container", {x:-200,duration:1,autoAlpha:0, })
AnimationBody.from(".nightTour-container", {y:200,duration:1,autoAlpha:0, })
AnimationBody.from(".competition-container", {x:200,duration:1,autoAlpha:0, })
AnimationBody.from(".subscribe-container", {x:-200,duration:1,autoAlpha:0,scale:1.10, })
AnimationBody.from(".giftcard-container", {x:200,duration:1,autoAlpha:0,scale:1.10, })
AnimationBody.from(".footer-container", {y:200,duration:1,autoAlpha:0,scale:1.10, })
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
