import React, { useEffect, useState, useContext } from "react";
import Header from "../Header/Header";
import './admin.css'
import {Link} from "react-router-dom";
import SideBar from "../SideBar/SideBar"
import { ConnectContext } from "../../context/ConnectContext";


function Admins() {
  const {makeMod, remMod } = useContext(ConnectContext);
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
                    <div className="row mb-3 d-inline-block">
                        <h3>Admins</h3>
                        <Link className="add-admin btn btn-primary" to='/dashboard-add-admin'>Add Admin</Link>
                    </div>
                    <div className="row">   
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>0x9F6Dd51f7a18Ce5D6FaFF9e5d3e5764Cca61cC44</td>
                                    <td><button className="btn btn-lg btn-danger">Revoke Admin</button></td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>0x9F6Dd51f7a18Ce5D6FaFF9e5d3e5764Cca61cC44</td>
                                    <td><button className="btn btn-lg btn-danger">Revoke Admin</button></td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>0x9F6Dd51f7a18Ce5D6FaFF9e5d3e5764Cca61cC44</td>
                                    <td><button className="btn btn-lg btn-danger">Revoke Admin</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
  );
}

export default Admins;