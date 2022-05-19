import React, { useState, useContext, useEffect } from "react";
import "./css/Nav.css";
import { ConnectContext } from "../../context/ConnectContext";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Hero from "../Hero/Hero";
import Feature from "../Feature/featureData";

import Footer from "../Footer/Footer";
function Nav(props) {
  let signInClass;
  let [navItemsClass, setNavItemsClass] = useState("nav-items");
  if (props.dark) {
    signInClass = "nav-item nav-item-active nav-item-active-dark";
  } else {
    signInClass = "nav-item nav-item-active";
  }

  const { currentAccount, connectWallet } = useContext(ConnectContext);

  const[ shortenedAddress, setShortenedAddress ] = useState("");

  useEffect(()=>{
    setShortenedAddress(`${currentAccount.toString().slice(0, 5)}...${currentAccount.toString().slice(currentAccount.length - 4)}`)  

  }, []);
  
  


  function toggle() {
    const AnimatedBtnTop = document.querySelector(".AnimatedBtn-Top");
    const AnimatedBtnMiddle = document.querySelector(".AnimatedBtn-Middle");
    const AnimatedBtnBottom = document.querySelector(".AnimatedBtn-Bottom");
    AnimatedBtnTop.classList.toggle("AnimatedBtn-TopClick");
    AnimatedBtnMiddle.classList.toggle("AnimatedBtn-MiddleClick");
    AnimatedBtnBottom.classList.toggle("AnimatedBtn-BottomClick");
    navItemsClass === "nav-items"
      ? setNavItemsClass("nav-items nav-items-active")
      : setNavItemsClass("nav-items");
  }

  return (
    <nav className="nav">
      <div className={navItemsClass}>
        <Link className="nav-item me-1" to="https://github.com/StreetMain-Lab/Rhythm">
          Rhythm Protocol
        </Link>
        <Link className="nav-item" to="/public-files">
          Governance
        </Link>
        <Link className="nav-item" to="https://docs.rhythm.com">
          Docs
        </Link>
        <Link className="nav-item" to="/Security">
          Security
        </Link>
        <Link className="nav-item" to="https://docs.rhythm.com/faq">
          FAQ
        </Link>
        {!currentAccount ? (
          <a className="nav-item" onClick={connectIpfs}>
          Launch App
          </a>
          ) : (
            <span className="nav-item">
              if (Lending Pool) 
              Profile: <Link to="/Registration">{shortenedAddress}</Link>
            </span>
          )}

        {!currentAccount ? (
          <a className="nav-item" onClick={connectWallet}>
            Connect Wallet
          </a>
        ) : (
          <span className="nav-item">
            Profile: <Link to="/dashboard">{shortenedAddress}</Link>
          </span>
        )}
      </div>
      <div className="AnimatedBtn">
        <span className={"AnimatedBtn-Top"}></span>
        <span className="AnimatedBtn-Middle"></span>
        <span className="AnimatedBtn-Bottom"></span>
        <div className="AnimatedBtn-Cover" onClick={toggle}></div>
      </div>
    </nav>
  );
}

export default Nav;