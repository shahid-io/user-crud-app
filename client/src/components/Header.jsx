import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import { AiOutlineUserAdd } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { VscTwitter } from "react-icons/vsc";
const Header = () => {
  return (
    <div className="nav">
      <Link className="links" to="/">
        <VscTwitter size={40} />
      </Link>
      <ul className="nav-items">
        <li>
          <Link className="links" to="/users">
            <FiUsers size={25} />
          </Link>
        </li>
        <li>
          <Link className="links" to="/create">
            <AiOutlineUserAdd size={25} />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
