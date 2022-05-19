import React, { useEffect, useState, useContext } from "react";
import Header from "../Header/Header";
import './addfile.css'
import {Link} from "react-router-dom";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utilities/constants";
import { Form, Button, Badge, ProgressBar, Container } from 'react-bootstrap';
import { create as ipfsHttpClient } from "ipfs-http-client";
import SideBar from "../SideBar/SideBar";

import { ConnectContext } from "../../context/ConnectContext";
const ipfs = ipfsHttpClient("https://ipfs.infura");

function AddFiles() {

  let [darkThemeActive, setDarkThemeActive] = useState(false);
  const {uploads } = useContext(ConnectContext);
  const[description, setdescription] =useState("")

  const [file, setFile] = useState({})
  const [fileUrl, setFileUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [uploaded, setUploaded] = useState(false)
  const [pub, setpub] = useState(true)

/**    function switchActiveTheme() {
    if (darkThemeActive) {
      setDarkThemeActive(false);
      document.querySelector("#root").style.backgroundColor = "white";
    } else {
      setDarkThemeActive(true);
      document.querySelector("#root").style.backgroundColor = "#1C2431";
    }
  } */

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
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
    console.log(pub)
  });

  const uploadFile = async (e) => {
    setLoading(true)
    e.preventDefault()

    try {
        const added = await ipfs.add(file)
        
        const url = `https://ipfs.infura.io/ipfs/${added.path}`
        const hash=  (added.path).toString()
        const name= (file.name.substr(0, file.name.lastIndexOf("."))).toString()
      
        const size = (file.size).toString()
       // const ftype=(file.type).toString()
       const ftype= (file.name.split('.').pop()).toString()
       
          await uploads(hash, size, ftype, name,description, pub)
        
        //setUrl(url)
        setFileUrl(url)
       
      
        setUploaded(true)
      
       
    } catch (err) {
        console.log('Error uploading the file : ', err)
    }
    setLoading(false)
    
}

const preUpload = (e) => {
  setUploaded(false)
    if (e.target.value !== '') {
        setFile(e.target.files[0])
    } else {
        setFile({})
    }
}

const fileAndUploadButton = () => {
    if (file.name) {
        if (!loading) {
            return (
                <div>
                    <h5>
                        {file.name} <Badge pill>{formatBytes(file.size)}</Badge>
                    </h5>

                    {uploaded ? (
                        <h5>
                            ✅{' '}
                            <a
                                href={fileUrl}
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                File
                            </a>{' '}
                            Uploaded Successfully ✅
                            
                        </h5>
                    ) : (
                      <div className="col-12">
                      <button type="submit" className="btn btn-primary">Upload File</button>
                  </div>
                    )}
                </div>
            )
        } else {
            return (
                <Container>
                    <h4>Uploading File</h4>
                    <ProgressBar animated now={100} />
                    <h4>Please Wait ...</h4>
                </Container>
            )
        }
    }
}
 
useEffect(() => {
    let RhythmContract;
  
    const onFileUploaded = (id, hash,size, type, name, description, time, uploader, isprivate) => {
      console.log("FileUploaded", name);
      alert( name + " has been uploaded by " + uploader )
    
    };
    
  
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
  
      RhythmContract = new ethers.Contract(contractAddress, contractABI, signer);
      RhythmContract.on("FileUploaded", onFileUploaded);
    }
  
    return () => {
      if (RhythmContract) {
        RhythmContract.off("FileUploaded", onFileUploaded);
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
                        <h3>Add Files</h3>
                    </div>
                    <div className="row">
                    <form className="row g-3" onSubmit={uploadFile}>
                        
                        <div className="col-md-12">
                            <label className="form-label">Description</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={description} onChange={(e)=>setdescription(e.target.value)} required></textarea>
                        </div>
                        <Form.Control
                  required
                  type='file'
                  onChange={(e) => preUpload(e)}
                  className='mb-3'
              />
                        <div className="col-12">
                            <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" onChange={(e)=>{setpub(!pub)
                              console.log(pub)}} />
                             <label className="form-check-label" >Make Private</label>
                             </div>
                        </div>

                        {fileAndUploadButton()}
                        <br /><br />
                       
                    </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default AddFiles;