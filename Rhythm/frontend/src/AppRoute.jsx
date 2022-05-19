import React, { Component,Suspense, lazy } from 'react';
import {Routes, Route, Redirect } from 'react-router-dom';
import {BrowserRouter as Router} from 'react-router-dom';

import Spinner from './components/Spinner/Spinner';

const Home = lazy(() => import('./components/Home/Home'));

const PublicFiles = lazy(() => import('./components/PublicFiles/PublicFiles'));

const FilePreview = lazy(() => import('./components/FilePreview/FilePreview'));

const Profile = lazy(() => import('./components/Profile/Profile'));

const Dashboard = lazy(()=>import('./components/Dashboard/Dashboard'))

const Admins = lazy(()=>import('./components/Admins/Admins'))

const UserPublicFiles = lazy(()=>import('./components/UserPublicFiles/UserPublicFiles'))

const UserPrivateFiles = lazy(()=>import('./components/UserPrivateFiles/UserPrivateFiles'))

const ReportedFiles = lazy(() => import('./components/ReportedFiles/ReportedFiles'))

const ReportedUsers = lazy(()=> import('./components/ReportedUsers/ReportedUsers'));

const BlackListedUsers = lazy(()=> import('./components/BlackListedUsers/BlackListedUsers'));

const AddAdmin = lazy(()=>import('./components/AddAdmin/AddAdmin'));

const AddFiles = lazy(()=>import('./components/AddFiles/AddFiles'));





function AppRoutes(){

    return (
      <Suspense fallback={<Spinner/>}>
        <Router>
          <Routes>
            <Route exact path="/" element={ <Home/> } />
            <Route exact path="/public-files" element={ <PublicFiles/> } />
            <Route exact path="/file" element={ <FilePreview/> } />
            <Route exact path="/profile" element={ <Profile/> } />
            <Route exact path="/dashboard" element={ <Dashboard/> } />
            <Route exact path="/dashboard-admins" element={ <AddAdmin/> } />
            <Route exact path="/dashboard-public-files" element={ <UserPublicFiles/> } />
            <Route exact path="/dashboard-private-files" element={ <UserPrivateFiles/> } />
            <Route exact path="/dashboard-reported-files" element={ <ReportedFiles/> } />
            <Route exact path="/dashboard-reported-files" element={ <ReportedFiles/> } />
            <Route exact path="/dashboardreported-users" element={ <ReportedUsers/> } />
            <Route exact path="/dashboard-blacklisted-users" element={ <BlackListedUsers/>}/>
            <Route exact path="/dashboard-add-files" element={ <AddFiles/>}/>
            
          </Routes>
        </Router>
      </Suspense>
    )
}

export default AppRoutes;