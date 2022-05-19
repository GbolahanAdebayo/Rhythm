import React, { useEffect, useState, useContext } from "react";
import Header from "../Header/Header";
import './addadmin.css'
import {Link} from "react-router-dom";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utilities/constants";
import SideBar from "../SideBar/SideBar";

import { ConnectContext } from "../../context/ConnectContext";


function AddAdmin() {
  const {makeMod, remMod, pauseContract, unPauseContract } = useContext(ConnectContext);
  const[address, setAddress] =useState("")
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

  const handleAdd=async(e)=>{
    e.preventDefault()
    await makeMod(address)
  }
  const handleRemove=async(e)=>{
    e.preventDefault()
    await remMod(address)
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

  useEffect(() => {
    let NestDriveContract;
  
    const onAssignMod = (sender, addr) => {
      console.log("AssignMod", sender, addr);
      alert( sender + "has added " +addr + " as moderator")
    
    };
    
  
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
  
      NestDriveContract = new ethers.Contract(contractAddress, contractABI, signer);
      NestDriveContract.on("AssignMod", onAssignMod);
    }
  
    return () => {
      if (NestDriveContract) {
        NestDriveContract.off("AssignMod", onAssignMod);
      }
    };
  }, []);
  
  useEffect(() => {
    let NestDriveContract;
  
    const onRemoveMod = (sender, addr) => {
      console.log("RemoveMod", sender, addr);
      alert( sender + "has removed " +addr + " as moderator")
    
    };
    
  
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
  
      NestDriveContract = new ethers.Contract(contractAddress, contractABI, signer);
      NestDriveContract.on("RemoveMod", onRemoveMod);
    }
  
    return () => {
      if (NestDriveContract) {
        NestDriveContract.off("RemoveMod", onRemoveMod);
      }
    };
  }, []);
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
                        <h3>Add Admin</h3>
                    </div>
                    <div className="row">
                    <form class="row g-3" >
                        <div class="col-12">
                            <label for="inputAddress" class="form-label">Address</label>
                            <input type="text" class="form-control" id="inputAddress" placeholder="Enter Address" onChange={(e)=>setAddress(e.target.value)}/>
                        </div>
                        <div class="col-12">
                            <button type="submit" class="btn btn-primary mr-7" onClick={handleAdd}>Add Moderators</button>
                           {"     "}   {"     "}  <button type="submit" class=" pl-9 btn btn-warning"  onClick={handleRemove}>Remove Moderators</button>
                        </div>
                        </form>
                    </div>
                    <br/><br />
                   
                    <br/><br /><button  className="btn btn-lg btn-success" onClick={unPauseContract}>Restart Contract</button> <br/><br />
                    <button  className="btn btn-lg btn-danger" onClick={pauseContract}>Pause Contract</button> 
                   
                </div>
            </div>
        </div>
    </div>
  );
}

export default AddAdmin;