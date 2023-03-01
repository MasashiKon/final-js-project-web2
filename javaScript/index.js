window.addEventListener("DOMContentLoaded", () => {
  // Header visibility Start
  const header = document.querySelector(".navbar-container");
  let scrollTrigger = 100;
  window.onscroll = function () {
    if (
      scrollTrigger >= window.scrollY ||
      scrollTrigger >= window.pageYOffset
    ) {
      header.style.backgroundColor = "rgb(64, 66, 88,0.5)";
    } else {
      header.style.backgroundColor = "rgb(64, 66, 88)";
    }
  };
  // Header visibility End

  // Slider Clip Start

  const videos = [
    "./Assets/video/bear-88010.mp4",
    "./Assets/video/flamingo-80438.mp4",
    "./Assets/video/penguins-6641.mp4",
  ];
  const video = document.querySelector(".video-clip");
  const lastVideo = videos.length - 1;
  let currentVideo = 0;
  video.src = videos[0];

  // Slider Clip End
});
