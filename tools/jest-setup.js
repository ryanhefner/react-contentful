import jsdom from 'jsdom';
const { JSDOM } = jsdom;

global.document = new JSDOM('<!doctype HTML><html><body><div id="root"></div></body></html>');
