//import logo from './logo.svg';
import logo from './rhythm-logo.png';
//import 'bootstrap/dist/css/bootstrap.min.css';
import AppRoutes from './AppRoutes';
import {ConnectProvider}from './context/ConnectContext'

function App() {
  return (
    <ConnectProvider>
        <AppRoutes/>
    </ConnectProvider>
   
  );
}

export default App;
