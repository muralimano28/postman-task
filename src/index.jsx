import React from 'react';
import { render } from 'react-dom';

// Styles
import './normalize.min.css';
import './default.css';

import App from './containers';

render(<App />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept('./containers', () => {
    render(<App />, document.getElementById('root'));
  });
}
