import React from 'react';
import Page from './Page';
import DocsNav from '../components/DocsNav';

const DocsPage = (props) => (
  <div className="Docs">
    <DocsNav />
    <div className="Docs-page">
      <Page {...props} />
    </div>
  </div>
);

export default DocsPage;
