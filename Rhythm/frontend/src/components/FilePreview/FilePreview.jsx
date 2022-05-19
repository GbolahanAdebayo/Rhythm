import React, { useEffect, useState,useContext } from "react";
import Header from "../Header/Header";
import Iframe from "react-iframe";
import {Link,useLocation} from "react-router-dom";
import moment from 'moment';
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utilities/constants";
import './FilePreview.css'
import { ConnectContext } from "../../context/ConnectContext";


function FilePreview() {
  const {currentAccount, checkMod, fetchAll, reportFile, checkModerator, makePrivate, takeAction } = useContext(ConnectContext);
  const[Files, setFiles] =useState([])

  let [darkThemeActive, setDarkThemeActive] = useState(false);
  const location = useLocation()
  const id = location.state

  function switchActiveTheme() {
    if (darkThemeActive) {
      setDarkThemeActive(false);
      document.querySelector("#root").style.backgroundColor = "white";
    } else {
      setDarkThemeActive(true);
      document.querySelector("#root").style.backgroundColor = "#1C2431";
    }
  }
  const fetch =async()=>{
   
    console.log(id)
    const result= await fetchAll(id)
    setFiles(result)
  
  
     } 

     const handleReport =async()=>{
   

      const result = await reportFile(id)
     
    
    
       } 

    

    const isAdmin = checkModerator(currentAccount);


  useEffect(()=>{
    fetch()
  }, [])

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

  const isMod =async()=>{
    const result=  await checkModerator(currentAccount) //
    console.log(result)
  }
 useEffect(()=>{
isMod()

 })

 useEffect(() => {
  let NestDriveContract;

  const onnewReport = (id) => {
    console.log("newReport", id);
    alert("File has been reported")
  
  };
  

  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    NestDriveContract = new ethers.Contract(contractAddress, contractABI, signer);
    NestDriveContract.on("newReport", onnewReport);
  }
  
  return () => {
    if (NestDriveContract) {
      NestDriveContract.off("newReport", onnewReport);
    }
  };
}, []);

  return (
    <div>
      <Header
        isdarkThemeActive={darkThemeActive}
      />

      <div className="container mt-5 preview">
          <div className="row">
              <div className="col-12 col-md-6">
                <h3>{Files.fileName}</h3>
                <small>created by <a href={"https://etherscan.io/address/" + Files.uploader}>{Files.uploader}</a></small>
                <br/><br/>
                <p>{Files.fileDescription}</p>
                <p className="card-text"><small className="text-muted">Uploaded on  {moment.unix(Files.uploadTime).format("Do MM YYYY")}</small></p>
                <img alt="" src={"https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://ipfs.infura.io/ipfs/"  + Files.fileHash}></img>
                <div  className="mt-2">
                    <button className="btn btn-small btn-primary me-1"><a href={"http://www.twitter.com/share?text=check out " + Files.fileName + "&url=https://ipfs.infura.io/ipfs/" + Files.fileHash} className="imp" data-action="share/whatsapp/share">Share File</a></button>
                    <button className="btn btn-small btn-warning me-1" onClick={()=>handleReport(Number(Files.fileId))}>Report File</button>
                    <button className="btn btn-small btn-success"><a href={"https://ipfs.infura.io/ipfs/" + Files.fileHash} className="imp" download={Files.fileName + "from NestDrive"} >Download File</a></button>
                </div>
              </div>
              <div className="col-12 col-md-6">
              <Iframe url={"https://ipfs.infura.io/ipfs/"  + Files.fileHash}
                width="100%"
                height="600px"
                id="myId"
                className="myClassname"
                display="initial"
                position="relative"/>
              </div>
          </div>
      </div>
      </div>
  );
}

export default FilePreview;