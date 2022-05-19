import React, { useEffect, useState, useContext } from "react";
import './sidebar.css'
import {Link} from "react-router-dom";

import { ConnectContext } from "../../context/ConnectContext";


function SideBar(props) {
  const { currentAccount, checkModerator } = useContext(ConnectContext);

  let [darkThemeActive, setDarkThemeActive] = useState(false);

  const [isAdmin, setIsAdmin] = useState(false);
  
  const report = async()=>{

   const isAdmin =  await checkModerator(currentAccount);

    setIsAdmin(isAdmin);
  }

  useEffect(()=>{
    report()
   },[])


  
  return (
    
        <>
            { !isAdmin ?
            
                <><Link className="link p-3 mb-3" to="/dashboard-public-policy-files">
                  Public Poliy Files
              </Link><Link className="link p-3 mb-3" to="/dashboard-private-policy-files">
                      Private Policy Files
                  </Link><Link className="link p-3 mb-3" to="/dashboard-add-policy-files">
                      Add Policy Files
                  </Link></>
            : 
                <><Link className="link p-3 mb-3" to="/dashboard-public-policy-files">
                  Public Policy Files
              </Link><Link className="link p-3 mb-3" to="/dashboard-private-policy-files">
                      Private Policy Files
                  </Link><Link className="link p-3 mb-3" to="/dashboard-add-policy-files">
                      Add Policy Files
                  </Link><Link className="link p-3 mb-3" to="/dashboard-admins">
                      Admins
                  </Link><Link className="link p-3 mb-3" to="/dashboard-reported-files">
                      Reported Files
                  </Link><Link className="link p-3 mb-3" to="/dashboardreported-users">
                      Reported Users
                  </Link><Link className="link p-3 mb-3" to="/dashboard-blacklisted-users">
                      Blacklisted Users
                  </Link></>
            }
            
            
            
        </>
        
  );
}

export default SideBar;