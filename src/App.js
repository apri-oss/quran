import logo from './logo.svg';
import './App.css';
import Home from '../src/pages/home/Home';
import Navigation from '../src/pages/navigation/Navigation';
import SuratList from '../src/pages/suratList/SuratList';
import {BrowserRouter as Router, Routes,Route, Link } from "react-router-dom";
import Surat from './pages/surat/Surat';
import Murotal from './pages/murotal/Murotal';

function App() {
  return(
    <div className="row">
    <div className="column-left">
    </div>
    <div className="column-center">
      <Router>
          <div>
            <Home/>
            <br />
            <hr />
            <Navigation/>
            <br />
            <hr />
            <br />
            <Routes>
              <Route path="/"  element={<SuratList/>}></Route>
              <Route path="/surat/:nomor" element={<Surat/>}></Route>
              <Route path="/murotal" element={<Murotal/>}></Route>

            </Routes>
            <br />
            <br />
          </div>
        </Router>
    </div>
    <div className="column-right"></div>

  </div>

  );
}

export default App;
