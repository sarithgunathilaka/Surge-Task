import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header style={headerStyle}>
      <h1>Surge Global Portal</h1>
     
      
    </header>
  )
}

const headerStyle = {
  background: '#333',
  color: '#fff',
  textAlign: 'center',
  padding: '10px'
}

const linkStyle = {
  color: '#fff',
  textDecoration: 'none'
}

export default Navbar;