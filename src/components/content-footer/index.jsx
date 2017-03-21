import React, { Component, PropTypes } from 'react';

import './style.css';

class ContentFooter extends Component {
  static propTypes = {
    userId: PropTypes.string.isRequired,
    activeChat: PropTypes.string.isRequired,
    onSendingMsg: PropTypes.func.isRequired,
    isGroup: PropTypes.bool,
  };
  static defaultProps = {
    isGroup: false,
  };
  state = {
    inputValue: '',
  };
  componentDidMount() {
    this.focusInput();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.activeChat !== nextProps.activeChat) {
      this.setState({
        inputValue: '',
      });
    }
  }
  componentDidUpdate() {
    this.focusInput();
  }


  onKeyDownHandler = (ev) => {
    if (ev.keyCode === 13 && this.state.inputValue) {
      const { activeChat, userId, isGroup } = this.props;
      const { inputValue } = this.state;

      // Create an action.
      this.props.onSendingMsg({
        id: `msg-id-${new Date().getTime()}`,
        content: inputValue,
        recipientId: activeChat,
        senderId: userId,
        isGroup,
      });
      this.setState({
        inputValue: '',
      });
    }
  }
  focusInput = () => {
    if (this.inputDom) {
      this.inputDom.focus();
    }
  }
  inputDom = null;


  render() {
    const { inputValue } = this.state;

    return (
      <div className="content__footer">
        <button className="button emoji-btn content__footer_emoji-btn" />
        <div className="content__footer_input-cont">
          {
            (inputValue === undefined || inputValue === null || inputValue === '') ? (
              <button
                className="button placeholder content__footer_placeholder"
                onClick={this.focusInput}
              >Type a message</button>
            ) : null
          }
          <input
            className="input content__footer_input"
            value={inputValue}
            onChange={(ev) => { this.setState({ inputValue: ev.target.value }); }}
            onKeyDown={this.onKeyDownHandler}
            ref={(node) => { this.inputDom = node; }}
          />
        </div>
        <button className="button mic-btn content__footer_mic-btn" />
      </div>
    );
  }
}

export default ContentFooter;
