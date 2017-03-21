import React, { Component, PropTypes } from 'react';

import './style.css';

class SearchBox extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onInputChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    className: PropTypes.string,
  };
  static defaultProps = {
    placeholder: 'Search here',
    className: '',
  };
  state = {
    isInputFocused: false,
  };
  onKeyDownHandler = (ev) => {
    if (ev.keyCode === 27) {
      this.inputNode.blur();

      this.setState({
        isInputFocused: false,
      });

      this.props.onInputChange('');
    }
  }
  inputNode = null;
  focusInput = () => {
    this.inputNode.focus();
    this.setState({
      isInputFocused: true,
    });
  }
  render() {
    const { value, onInputChange, placeholder, className } = this.props;
    const { isInputFocused } = this.state;

    return (
      <section className={`search-box ${className}`}>
        <div className={`search-box__wrapper ${(isInputFocused) ? 'search-box__wrapper_focused' : ''}`}>
          {
            (isInputFocused) ? (
              <button
                className="button search-box__back-btn"
                onClick={() => { this.setState({ isInputFocused: false }); onInputChange(''); }}
              />
            ) : (
              <button
                className="button search-box__search-btn"
                onClick={this.focusInput}
              />
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
            onChange={(ev) => { onInputChange(ev.target.value.trim()); }}
            ref={(node) => { this.inputNode = node; }}
            onClick={() => { this.setState({ isInputFocused: true }); }}
            onKeyDown={this.onKeyDownHandler}
          />
          {
            (value === undefined || value === null || value === '') ? null :
            (
              <button
                className="button search-box__clear-btn"
                onClick={() => { this.focusInput(); onInputChange(''); }}
              />
            )
          }
        </div>
      </section>
    );
  }
}

export default SearchBox;
