// sliderConfig.js or any utility file
export const getMenuStyles = (menuOpened) => {
  if (typeof document !== "undefined" && document.documentElement.clientWidth <= 800) {
    return { right: !menuOpened ? "-100%" : "0" };
  }
  return {};
};

export const sliderSettings = {
  breakpoints: {
    480: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    600: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    750: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
    1100: {
      slidesPerView: 4,
      spaceBetween: 50,
    },
  },
};
