import React from "react";
import './Home.css';
import accountLogo from '../../assets/logo.png';



const Home = () =>{

  const handleClick = () =>{
    window.location.href = '/'

  }
  return(    
    <div>      
      <div className="header">
        <div className="logo-container" onClick ={() => handleClick()} >
          <img src={accountLogo} alt="Quran App. logo"/>
          <p className="text-header">QURAN</p>
        </div>

      </div>
    </div>
    

  )
}

export default Home;