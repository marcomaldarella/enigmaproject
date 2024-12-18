import React from "react";
import Link from "next/link";
import "./MenuBar.css";
import MenuBtn from "../MenuBtn/MenuBtn";
import LogoBar from "../LogoBar/LogoBar";

const MenuBar = ({ isOpen, toggleMenu, closeMenu, logoColor }) => {
  return (
    <div className="menu-bar">
      <div id="logo-container" className="logo" onClick={closeMenu}>
        <Link href="/">
          <LogoBar fillColor={logoColor} /> {/* Passa il colore dinamico */}
        </Link>
      </div>

      <div className="menu-toggle-wrapper">
        <MenuBtn isOpen={isOpen} toggleMenu={toggleMenu} />
      </div>
    </div>
  );
};

export default MenuBar;
