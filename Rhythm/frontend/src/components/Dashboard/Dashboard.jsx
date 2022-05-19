import React, { useEffect, useState, useContext } from "react";
import Header from "../Header/Header";
import './dashboard.css'
import {Link} from "react-router-dom";

import { ConnectContext } from "../../context/ConnectContext";

import SideBar  from "../SideBar/SideBar";


function Dashboard() {

  const {currentAccount, fetchPrivate } = useContext(ConnectContext);
  let [darkThemeActive, setDarkThemeActive] = useState(false);
  const[Files, setFiles] =useState([])


  
  const fetch = async()=>{
   

    const pubFiles = await fetchPrivate()
    setFiles(pubFiles)
   // console.log(pubFiles)
  //   console.log(typeof(pubFiles.slice()
  //   .sort(function(a, b){return b.uploadTime - a.uploadTime})[1]))
  // console.log(newFiles)
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

  const newFile= Files.slice().sort(function(a, b){return b.uploadTime - a.uploadTime})
  const privateFile= newFile.filter(function(el){return el.isPublic===false})
  const publicFile= newFile.filter(function(el){return el.isPublic===true})
 

  return (
    <div>
      <Header
        isdarkThemeActive={darkThemeActive}
      />
        <div className="container preview mt-4">
            <div className="row">
                <div className="col-md-3">
                    <div className="sidebar p-3">
                      <SideBar/>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="row mb-3">
                        <h3>Hi, {currentAccount}</h3>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Public Files</h4>
                                    <p>No of public files you have created</p>
                                    <h4 id="counttruckdrivers" className="text-dark font-weight-bold mb-2">{publicFile.length}</h4>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Private Files</h4>
                                    <p>No of private files you have created</p>
                                    <h4 id="counttruckdrivers" className="text-dark font-weight-bold mb-2">{privateFile.length}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Dashboard;