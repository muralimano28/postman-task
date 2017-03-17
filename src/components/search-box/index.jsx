import React, { Component, PropTypes } from 'react';

import './style.css';

class SearchBox extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onInputChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
  };
  static defaultProps = {
    placeholder: 'Search here',
  };
  state = {
    isInputFocused: false,
  };
  inputNode = null;
  focusInput = () => {
    this.inputNode.focus();
    this.setState({
      isInputFocused: true,
    });
  }
  render() {
    const { value, onInputChange, placeholder } = this.props;
    const { isInputFocused } = this.state;

    return (
      <section className="search-box compose__search-box">
        <div className={`search-box__wrapper ${(isInputFocused) ? 'search-box__wrapper_focused' : ''}`}>
          {
            (isInputFocused) ? (
              <button
                className="button search-box__back-btn"
                onClick={() => { this.setState({ isInputFocused: false }); onInputChange(''); }}
              >B</button>
            ) : (
              <button
                className="button search-box__search-btn"
                onClick={this.focusInput}
              >S</button>
            )
          }
          {
            (isInputFocused || !(value === undefined || value === null || value === '')) ? null : (
              <button className="button search-box__placeholder" onClick={this.focusInput}>{placeholder}</button>
            )
          }
          <input
            className="input search-box__input"
            value={value}
            onChange={(ev) => { onInputChange(ev.target.value); }}
            ref={(node) => { this.inputNode = node; }}
            onClick={() => { this.setState({ isInputFocused: true }); }}
          />
          {
            (value === undefined || value === null || value === '') ? null :
            (
              <button
                className="button search-box__clear-btn"
                onClick={() => { this.setState({ isInputFocused: false }); onInputChange(''); }}
              >C</button>
            )
          }
        </div>
      </section>
    );
  }
}

export default SearchBox;
