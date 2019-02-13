import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="App-header">
    <Link to="/"><h1>react-contentful</h1></Link>
    <a href="https://github.com/ryanhefner/react-contentful">View on GitHub</a>
  </header>
);

export default Header;
