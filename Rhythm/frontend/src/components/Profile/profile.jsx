import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Iframe from "react-iframe";
import File from "../File/File";




function Profile() {

  let [darkThemeActive, setDarkThemeActive] = useState(false);

  function switchActiveTheme() {
    if (darkThemeActive) {
      setDarkThemeActive(false);
      document.querySelector("#root").style.backgroundColor = "white";
    } else {
      setDarkThemeActive(true);
      document.querySelector("#root").style.backgroundColor = "#1C2431";
    }
  }

  useEffect(() => {
    let headerFixedContainer = document.querySelector(".header-fixed");
    let headerHeight = headerFixedContainer.clientHeight;
    document.querySelector(".preview").style.paddingTop = `${
      headerHeight + 20
    }px`;

    let lastScrolled = 0;

    window.addEventListener("scroll", () => {
      let scrolled = document.documentElement.scrollTop;
      if (scrolled > lastScrolled) {
        headerFixedContainer.style.top = `-${headerHeight + 40}px`;
      } else {
        headerFixedContainer.style.top = "0";
      }
      lastScrolled = scrolled;
    });
  });

  const children = [];  
  for(let i = 0;i < 25;i++) {
    children.push(<File isdarkThemeActive={darkThemeActive}/>);
  }

 

  return (
    <div>
      <Header
        isdarkThemeActive={darkThemeActive}
        switchActiveTheme={switchActiveTheme}
      />

      
      
      <div className="container mt-5 preview">
        <div className="row">
            <h3>0x9F6Dd51f7a18Ce5D6FaFF9e5d3e5764Cca61cC44</h3>
            <p>This user has uploaded 5 policy files</p>
        </div>
      <div className="row">
      
      {children}
        
          

      </div>
    </div>
    </div>
  );
}

export default Profile;