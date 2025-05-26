import React, { useState } from "react";
import "./Header.css";
import { BiMenuAltRight } from "react-icons/bi";
import { getMenuStyles } from "../../../utils/common.js"; // Corrected import path
import useHeaderColor from "../../../hooks/useHeaderColor";
import OutsideClickHandler from "react-outside-click-handler";
// import React from "react";
import data from "../../../utils/slider.json";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
// Import Swiper styles
import "swiper/css";
// import "./Residencies.css";
import { sliderSettings } from "../../../utils/common";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";


import CountUp from "react-countup";
import { motion } from "framer-motion";
import { IoMdSearch } from "react-icons/io";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
  AccordionItemState,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import {
  MdOutlineArrowDropDown,
 
} from "react-icons/md";
import datas from "../../../utils/accordion.jsx";
const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const headerColor = useHeaderColor();

  return (
    <section className="h-wrapper" style={{ background: headerColor }}>
      <div className="flexCenter innerWidth paddings h-container">
        {/* logo */}
        {/* <img src="https://thumbs.dreamstime.com/b/vector-logo-coworking-place-to-work-workspace-195704921.jpg" alt="logo" width={100} /> */}

        {/* menu */}
        <OutsideClickHandler
          onOutsideClick={() => {
            setMenuOpened(false);
          }}
        >
          <div
            className="flexCenter h-menu"
            style={getMenuStyles(menuOpened)}
          >
            <a href="#residencies">Places</a>
            <a href="#value">Our Value</a>
            <a href="/contact">Contact Us</a>
           
            <button className="button">
              <a href="mailto:coworking@gmail.com">Contact</a>
            </button>
          </div>
        </OutsideClickHandler>

        {/* for medium and small screens */}
        <div
          className="menu-icon"
          onClick={() => setMenuOpened((prev) => !prev)}
        >
          <BiMenuAltRight size={30} />
        </div>
      </div>
      <section className="hero-wrapper">
      <div className="paddings innerWidth flexCenter hero-container">
        {/* left side */}
        <div className="flexColStart hero-left">
          <div className="hero-title">
            <div className="orange-circle" />
            <motion.h1
            initial={{ y: "2rem", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 2,
              type: "ease-in",
            }}
            >
              Discover <br />
              Most Suitable
              <br />Work place
            </motion.h1>
          </div>
          <div className="flexColStart secondaryText flexhero-des">
            <span>Find a variety of Office places and Meeting rooms that suit you very easilty</span>
            <span>Forget all difficulties in finding a Office places and Meeting rooms for you</span>
          </div>

          
          <div className="search-bar">
              <IoMdSearch /> <input type="search" placeholder="Search..." />
            </div>
          <div className="flexCenter stats">
            <div className="flexColCenter stat">
              <span>
                <CountUp start={8800} end={9000} duration={4} /> <span>+</span>
              </span>
              <span className="secondaryText">Premium Product</span>
            </div>

            <div className="flexColCenter stat">
              <span>
                <CountUp start={1950} end={2000} duration={4} /> <span>+</span>
              </span>
              <span className="secondaryText">Happy Customer</span>
            </div>

            <div className="flexColCenter stat">
              <span>
                <CountUp end={28} /> <span>+</span>
              </span>
              <span className="secondaryText">Awards Winning</span>
            </div>
          </div>
        </div>

        {/* right side */}
        <div className="flexCenter hero-right">
          <motion.div
            initial={{ x: "7rem", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 2,
              type: "ease-in",
            }}
            className="image-container"
          >
            <img src="https://cdn.shopify.com/s/files/1/0605/0136/0804/files/Modern_meeting_room_with_advanced_technology.jpg?v=1703751846" alt="houses" />
          </motion.div>
        </div>
      </div>
    </section>
      <div id="residencies" className="r-wrapper">
      <div className="paddings innerWidth r-container">
        <div className="flexColStart r-head">
          <span className="orangeText">Choose Us</span>
          <span className="primaryText">For best Working environment</span>
        </div>
       <div className="r-wrapper-slider">
  <Swiper
    {...sliderSettings}
    modules={[Navigation, Pagination]}
    navigation
    pagination={{ clickable: true }}
  >
    {data.map((card, i) => (
      <SwiperSlide key={i}>
        <div className="flexColStart r-card">
          <img src={card.image} alt="home" />
          <span className="secondaryText r-price">
            <span style={{ color: "orange" }}>$</span>
            <span>{card.price}</span>
          </span>
          <span className="primaryText">{card.name}</span>
          <span className="secondaryText">{card.detail}</span>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
</div>

      </div>
    </div><section id="value" className="v-wrapper">
      <div className="paddings innerWidth flexCenter v-container">
        {/* left side */}
        <div className="v-left">
          <div className="image-container">
            <img src="https://www.computerworld.com/wp-content/uploads/2024/03/home-office-ideal-setup-angle-100843210-orig.jpg?quality=50&strip=all" alt="" />
          </div>
        </div>

        {/* right */}
        <div className="flexColStart v-right">
          <span className="orangeText">Our Value</span>

          <span className="primaryText">Value We Give to You</span>

          <span className="secondaryText">
            We always ready to help by providijng the best services for you.
            <br />
            We beleive a good Place to work can make your life better
          </span>

          <Accordion
            className="accordion"
            allowMultipleExpanded={false}
            preExpanded={[0]}
          >
            {datas.map((item, i) => {
              const [className, setClassName] = useState(null);
              return (
                <AccordionItem className={`accordionItem ${className}`} uuid={i} key={i}>
                  <AccordionItemHeading>
                    <AccordionItemButton className="flexCenter accordionButton ">
                        {/* just for getting state of item */}
                      <AccordionItemState>
                        {({ expanded }) =>
                          expanded
                            ? setClassName("expanded")
                            : setClassName("collapsed")
                        }
                      </AccordionItemState>
                      <div className="flexCenter icon">{item.icon}</div>
                      <span
                        className="primaryText"
                      >
                        {item.heading}
                      </span>
                      <div className="flexCenter icon">
                        <MdOutlineArrowDropDown size={20} />
                      </div>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <p className="secondaryText">{item.detail}</p>
                  </AccordionItemPanel>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
    </section>
    </section>
  );
};

export default Header;
const SlideNextButton = () => {
  const swiper = useSwiper();
  return (
    <div className="flexCenter r-buttons">
      <button onClick={() => swiper.slidePrev()} className="r-prevButton">
        &lt;
      </button>
      <button onClick={() => swiper.slideNext()} className="r-nextButton">
        &gt;
      </button>
    </div>
  );
};