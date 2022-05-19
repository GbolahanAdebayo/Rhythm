import React, { useEffect, useState, useContext } from "react";
import Header from "../Header/Header";
import './userpublicfiles.css'
import {Link} from "react-router-dom";
import UserFiles from '../UserFiles/UserFiles'
import SideBar from "../SideBar/SideBar";

import { ConnectContext } from "../../context/ConnectContext";


function UserPublicFiles() {

  const {fetchPrivate } = useContext(ConnectContext);
  let [darkThemeActive, setDarkThemeActive] = useState(false);
  const[Files, setFiles] =useState([])


  const fetch =async()=>{
   

    const pubFiles = await fetchPrivate()
    setFiles(pubFiles)
  
     } 
  
     useEffect(()=>{
      fetch()
     },[])


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
  const newFile= Files.slice().sort(function(a, b){return b.uploadTime - a.uploadTime})
 const newer= newFile.filter(function(el){return el.isPublic===true})
  for(let i = 0;i < newer.length;i++) {
    children.push(<UserFiles public={newer[i]} isdarkThemeActive={darkThemeActive}/>);
  }

 

  return (
    <div>
      <Header
        isdarkThemeActive={darkThemeActive}
      />
        <div className="container preview mt-3">
            <div className="row">
                <div className="col-md-3">
                    <div className="sidebar p-3">

                        <SideBar/>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="row mb-3">
                        <h3>Your Public Files</h3>
                    </div>
                    <div className="row">
                        
                        {children}
                            
                            

                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default UserPublicFiles;