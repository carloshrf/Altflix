import React from 'react';
import Logo from '../../assets/img/Logo.png';

import './Menu.css';

export default function Menu() {
  return (
    <nav className="Menu">
      <a href="/">
        <img className="Logo" src={Logo} alt="Altflix logo" />
      </a>
    </nav>
  )
}