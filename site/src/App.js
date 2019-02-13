import React, { Component } from 'react';
import { ContentfulClient, ContentfulProvider } from 'react-contentful';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Page from './pages/Page';
import DocsPage from './pages/DocsPage';
import './App.css';

const contentfulClient = new ContentfulClient({
  accessToken: '23b20723ef0ffdc1f0e123e8fb76cffeacac8ec8b9199ed3e384cc37cf2256b7',
  space: 'nh6zyt31q7gz',
});

class App extends Component {
  render() {
    return (
      <ContentfulProvider client={contentfulClient}>
        <Router>
          <div className="App">
            <Header />
            <div className="App-pageWrapper">
              <Switch>
                <Route path="/docs/:slug*" component={DocsPage} />
                <Route path="/:slug*" component={Page} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </ContentfulProvider>
    );
  }
}

export default App;
