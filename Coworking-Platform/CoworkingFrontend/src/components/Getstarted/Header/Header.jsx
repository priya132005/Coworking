import React, { useEffect, useState } from "react";
import "./Header.css";
import { BiMenuAltRight } from "react-icons/bi";
import { getMenuStyles } from "../../../utils/common.js";
import useHeaderColor from "../../../hooks/useHeaderColor";
import OutsideClickHandler from "react-outside-click-handler";

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
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../../../Common/index.js";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const headerColor = useHeaderColor();
  const navigate = useNavigate();

  const [spaces, setSpaces] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const response = await fetch(SummaryApi.getAllSpaces.url, {
          method: SummaryApi.getAllSpaces.method,
        });
        const data = await response.json();
        if (data.success) {
          setSpaces(data.data);
        }
      } catch (err) {
        // Silently fail on the landing page slider; SpacesList page will
        // still show a proper error if the backend is unreachable.
      }
    };

    fetchSpaces();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/spaces${searchTerm ? `?search=${encodeURIComponent(searchTerm)}` : ""}`);
  };

  return (
    <section className="h-wrapper" style={{ background: headerColor }}>
      {/* HEADER MENU */}
      <div className="flexCenter innerWidth paddings h-container">
        <OutsideClickHandler onOutsideClick={() => setMenuOpened(false)}>
          <div className="flexCenter h-menu" style={getMenuStyles(menuOpened)}>
            <a href="#residencies">Places</a>
            <a href="#value">Our Value</a>
            <Link to="/spaces" className="button">
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

            <form className="search-bar" onSubmit={handleSearch}>
              <IoMdSearch />
              <input
                type="search"
                placeholder="Search by city or space name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>

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

          {spaces.length === 0 ? (
            <p className="secondaryText" style={{ textAlign: "center" }}>
              No spaces available yet.
            </p>
          ) : (
            <Swiper
              {...sliderSettings}
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
            >
              {spaces.map((space) => (
                <SwiperSlide key={space._id}>
                  <Link
                    to={`/book/${space._id}`}
                    className="r-card"
                    style={{ textDecoration: "none", color: "inherit", display: "block" }}
                  >
                    <img
                      src={
                        space.images?.[0] ||
                        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
                      }
                      alt={space.name}
                    />
                    <span className="r-price">
                      <span style={{ color: "orange" }}>₹</span>
                      {space.pricePerHour}/hr
                    </span>
                    <span className="primaryText">{space.name}</span>
                    <span className="secondaryText">{space.address}</span>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
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
