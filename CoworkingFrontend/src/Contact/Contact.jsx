import React from "react";
import "./Contact.css";
import { MdCall } from "react-icons/md";
import { BsFillChatDotsFill } from "react-icons/bs";
import { HiChatBubbleBottomCenter } from 'react-icons/hi2';

const backendDomain = "http://localhost:3000"; // Update if deployed

const handleAction = async (actionType) => {
  try {
    const response = await fetch(`${backendDomain}/api/${actionType}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Priya',
        email: 'coworking@gmail.com',
        message: 'Hello!'
      })
    });

    const result = await response.text();

    if (!response.ok) {
      throw new Error(result);
    }

    alert(result);
  } catch (error) {
    alert('Error: ' + error.message);
  }
};

const modes = [
  { type: 'call', label: 'Call', Icon: MdCall },
  { type: 'chat', label: 'Chat', Icon: BsFillChatDotsFill },
  { type: 'videoCall', label: 'Video Call', Icon: BsFillChatDotsFill },
  { type: 'message', label: 'Message', Icon: HiChatBubbleBottomCenter },
];

const Contact = () => (
  <div id="contact-us" className="c-wrapper">
    <div className="paddings innerWidth flexCenter c-container">
      <div className="flexColStart c-left">
        <span className="primaryText">Easy to contact us</span>
        <span className="secondaryText">
          We are always ready to help by providing the best services for you.
          <h1><b>Get in touch for best working environment....</b></h1>
        </span>

        <div className="flexColStart contactModes">
          <div className="flexStart row" style={{ flexWrap: 'wrap', gap: '1.5rem' }}>
            {modes.map(({ type, label, Icon }, i) => (
              <button key={i} className="flexColCenter mode" onClick={() => handleAction(type)}>
                <div className="flexStart">
                  <div className="flexCenter icon"><Icon size={25} /></div>
                  <div className="flexColStart detail">
                    <span className="primaryText">{label}</span>
                    <span className="secondaryText">021 123 145 14</span>
                  </div>
                </div>
                <div className="flexCenter button">{label} now</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flexEnd c-right">
        <div className="image-container">
          <img
            src="https://fancyhouse-design.com/wp-content/uploads/2023/11/The-CEOs-office-with-its-modern-art-and-luxury-finishes-reflects-a-balance-of-power-and-design..jpg"
            alt="CEO Office"
          />
        </div>
      </div>
    </div>
  </div>
);

export default Contact;
