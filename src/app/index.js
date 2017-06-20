import React from 'react';
import { render } from 'react-dom';
import mycss from './../styles/scss-style.scss';

const image = require('./image2.png');

const App = () => (
  <div>
    <h1>Index page</h1>
    <img src={image} width="150" role="presentation" />
  </div>
);

render(
  <App />,
  document.getElementById('root')
);
