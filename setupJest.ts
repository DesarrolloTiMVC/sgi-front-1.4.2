import 'jest-preset-angular'
//import 'jest-global-mocks'
//const puppeteer = require();
import * as puppeteer from 'puppeteer'

exports.config = {
  // ...
  capabilities: {
    browserName: 'chrome',
  },
  // ...
};