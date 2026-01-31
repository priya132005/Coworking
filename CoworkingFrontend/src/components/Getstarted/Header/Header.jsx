import React, { useState } from "react";
import "./Header.css";
import { BiMenuAltRight } from "react-icons/bi";
import { getMenuStyles } from "../../../utils/common.js";
import useHeaderColor from "../../../hooks/useHeaderColor";
import OutsideClickHandler from "react-outside-click-handler";

import data from "../../../utils/slider.json";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { sliderSettings } from "../../../utils/common";

import CountUp from "react-countup";
import { motion } from "framer-motion";
import { IoMdSearch } from "react-icons/io";

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import { MdOutlineArrowDropDown } from "react-icons/md";

import datas from "../../../utils/accordion.jsx";
import { Link } from "react-router-dom";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const headerColor = useHeaderColor();

  return (
    <section className="h-wrapper" style={{ background: headerColor }}>
      {/* HEADER MENU */}
      <div className="flexCenter innerWidth paddings h-container">
        <OutsideClickHandler onOutsideClick={() => setMenuOpened(false)}>
          <div className="flexCenter h-menu" style={getMenuStyles(menuOpened)}>
            <a href="#residencies">Places</a>
            <a href="#value">Our Value</a>
            <Link to="/book" className="button">
              Book Now
            </Link>
          </div>
        </OutsideClickHandler>

        <div
          className="menu-icon"
          onClick={() => setMenuOpened((prev) => !prev)}
        >
          <BiMenuAltRight size={30} />
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="hero-wrapper">
        <div className="paddings innerWidth flexCenter hero-container">
          {/* LEFT */}
          <div className="flexColStart hero-left">
            <div className="hero-title">
              <div className="orange-circle" />
              <motion.h1
                initial={{ y: "2rem", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 2 }}
              >
                Discover <br />
                Most Suitable <br />
                Work place
              </motion.h1>
            </div>

            <div className="secondaryText hero-subtitle">
              <span>Find the best office & meeting rooms easily</span>
              <span>No more hassle in finding workspaces</span>
            </div>

            <div className="search-bar">
              <IoMdSearch />
              <input type="search" placeholder="Search..." />
            </div>

            <div className="flexCenter stats">
              <div className="stat">
                <CountUp start={8800} end={9000} duration={4} />+
                <span className="secondaryText">Premium Product</span>
              </div>
              <div className="stat">
                <CountUp start={1950} end={2000} duration={4} />+
                <span className="secondaryText">Happy Customers</span>
              </div>
              <div className="stat">
                <CountUp end={28} />+
                <span className="secondaryText">Awards Winning</span>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="hero-right">
            <motion.div
              initial={{ x: "7rem", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 2 }}
              className="image-container"
            >
              <img
                src="https://cdn.shopify.com/s/files/1/0605/0136/0804/files/Modern_meeting_room_with_advanced_technology.jpg"
                alt="workspace"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* SLIDER SECTION */}
      <section id="residencies" className="r-wrapper">
        <div className="paddings innerWidth r-container">
          <div className="r-head">
            <span className="orangeText">Choose Us</span>
            <span className="primaryText">Best Working Environment</span>
          </div>

          <Swiper
            {...sliderSettings}
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
          >
            {data.map((card, i) => (
              <SwiperSlide key={i}>
                <div className="r-card">
                  <img src={card.image} alt={card.name} />
                  <span className="r-price">
                    <span style={{ color: "orange" }}>$</span>
                    {card.price}
                  </span>
                  <span className="primaryText">{card.name}</span>
                  <span className="secondaryText">{card.detail}</span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* VALUE SECTION */}
      <section id="value" className="v-wrapper">
        <div className="paddings innerWidth flexCenter v-container">
          <div className="v-left">
            <img
              src="https://www.computerworld.com/wp-content/uploads/2024/03/home-office-ideal-setup-angle-100843210-orig.jpg"
              alt="value"
            />
          </div>

          <div className="v-right">
            <span className="orangeText">Our Value</span>
            <span className="primaryText">Value We Give You</span>

            <Accordion allowMultipleExpanded={false} preExpanded={[0]}>
              {datas.map((item, i) => (
                <AccordionItem uuid={i} key={i}>
                  <AccordionItemHeading>
                    <AccordionItemButton className="accordionButton">
                      <div className="icon">{item.icon}</div>
                      <span className="primaryText">{item.heading}</span>
                      <MdOutlineArrowDropDown size={20} />
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <p className="secondaryText">{item.detail}</p>
                  </AccordionItemPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Header;
