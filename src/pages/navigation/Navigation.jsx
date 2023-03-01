import React, {Component} from "react";
import './Navigation.css';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';


class Navigation extends Component{

  render(){
    return(
      <div className="navigation-header">
        <li><a><NavLink to='/' activeClassName="active">Surat</NavLink></a></li>
        <li><a><NavLink to='/murotal' activeClassName="active">Murotal</NavLink></a></li>
      </div>
    )
  }
}

export default Navigation;