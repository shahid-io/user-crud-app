import React from "react";
import "../styles/Footer.css";
import { FcHome, FcAbout } from "react-icons/fc";
import { PiUsersLight } from "react-icons/pi";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer">
      <div className="container p-3">
        <ul className="d-flex justify-content-center gap-5">
          <li>
            <Link to="/">
              <FcHome size={30} />
            </Link>
          </li>
          <li>
            <Link to="/about">
              <FcAbout size={30} />
            </Link>
          </li>
          <li>
            <Link to="users">
              <PiUsersLight size={30} />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
