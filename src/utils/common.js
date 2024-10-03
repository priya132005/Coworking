export const getMenuStyles = (menuOpened) => {
  // Check if the document exists (important in server-side rendering)
  if (typeof document !== "undefined" && document.documentElement.clientWidth <= 800) {
    return { right: !menuOpened ? "-100%" : "0" };
  }
  return {}; // Return empty object for default styles
};

export const sliderSettings = {
  slidesPerView: 1,
  spaceBetween: 50,
  breakpoints: {
    480: {
      slidesPerView: 1,
    },
    600: {
      slidesPerView: 2,
    },
    750: {
      slidesPerView: 3,
    },
    1100: {
      slidesPerView: 4,
    },
  },
};


