import React from 'react';
import Logo from '../../assets/img/Logo.png';
import Button from '../Button';

import './Menu.css';

export default function Menu() {
  return (
    <nav className="Menu">
      <a href="/">
        <img className="Logo" src={Logo} alt="Altflix logo" />
      </a>

      <Button as="a" href="/">
        Novo vídeo
      </Button>
    </nav>
  )
}