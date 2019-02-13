import React from 'react';
import { NavLink } from 'react-router-dom';

const DocsNav = () => (
  <nav className="Docs-nav">
    <NavLink to="/docs">Getting Started</NavLink>
    <NavLink to="/docs/client">ContentfulClient</NavLink>
    <NavLink to="/docs/provider">ContenfulProvider</NavLink>
    <NavLink to="/docs/query">Query</NavLink>
  </nav>
);

export default DocsNav;
