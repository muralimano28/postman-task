import React from 'react';
import { render } from 'react-dom';

import App from './containers';

render(<App />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept('./containers', () => {
    render(<App />, document.getElementById('root'));
  });
}
