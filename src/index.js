import styles from './assets/scss/app.scss';
import 'whatwg-fetch';
import 'promise-polyfill/src/polyfill';
import { App } from "./app";

const app = new App();

app.initializeApp();