const headerAnimation = () => {
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
}
export {headerAnimation}



