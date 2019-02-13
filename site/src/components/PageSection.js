import React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const PageSection = ({ className = '', title = 'Title', description = {} }) => (
  <section className={`App__page-section ${className}`}>
    <h2 className="App__page-section__title">{title}</h2>
    <div className="App__page-section__description">
      {documentToReactComponents(description)}
    </div>
  </section>
);

export default PageSection;
