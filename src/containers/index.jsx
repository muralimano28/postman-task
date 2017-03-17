import React, { Component } from 'react';

// Styles
import './style.css';

// Store
import Store from '../store';

// Other containers
import Sidebar from './sidebar';
import Content from './content';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = Store.getState();
    this.unSubscribe = null;
  }
  componentDidMount() {
    this.unSubscribe = Store.subscribe(this.updateStateFromStore);
  }
  componentWillUnmount() {
    if (this.unSubscribe) this.unSubscribe();
  }
  updateStateFromStore = () => {
    this.setState(Store.getState);
  }
  render() {
    return (
      <section>
        <Sidebar
          {...this.state}
        />
        <Content
          {...this.state}
        />
      </section>
    );
  }
}

export default App;
