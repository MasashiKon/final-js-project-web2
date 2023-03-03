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
  "/Assets/video1/flamingo.mp4",
  "/Assets/video2/zebra.mp4",
  "/Assets/video1/penguins.mp4",
  "/Assets/video2/rhino.mp4",
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
// gsap.registerPlugin(scrollTrigger);
let Animation = gsap.timeline({ repeatDelay: 1 });
Animation.from(".navbar-logo", { x: -200, duration: 2, autoAlpha: 0 });
Animation.from(".navbar-container2", { x: -200, duration: 1, autoAlpha: 0 });
Animation.from(".navbar-item", {
  x: -200,
  duration: 1,
  autoAlpha: 0,
  stagger: { each: 0.3 },
});
Animation.from(".navbar-ticket", {
  x: 200,
  duration: 1,
  autoAlpha: 0,
});
Animation.from(".ticket", { scale: 1.2 });

gsap.from(".video-container", { y: -200, duration: 3, autoAlpha: 0 });

gsap.from(".events-nightTour-competition-container", {
  scrollTrigger: {
    trigger: ".events-nightTour-competition-container",
    each: 0.5,
    start: "top center",
    toggleAction: "restart pause reverse pause",
    
  },
  y: 400,
  duration: 5,
  autoAlpha: 0,
  scale: 0.5,
});
