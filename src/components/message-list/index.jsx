import React, { Component, PropTypes } from 'react';

import { subscribeToOnResize, TimingUtils } from '../../utils';

import './style.css';

const MsgInfo = ({
  msg,
  areYouTheSender,
  senderInfo,
  isContinuation,
  isGroup,
}) => {
  let tickClassName = '';

  if (areYouTheSender) {
    if (msg.read_at) {
      tickClassName = 'double-blue';
    } else if (msg.delivered_at) {
      tickClassName = 'double';
    } else {
      tickClassName = 'single';
    }
  }

  return (
    <div className="msg">
      <div
        className={
          (areYouTheSender) ?
          `msg__from-self ${(isContinuation) ? '' : 'msg__from-self_starting'}` :
          `msg__from-recipient ${(isContinuation) ? '' : 'msg__from-recipient_starting'}`
        }
      >
        {
          (!areYouTheSender && isGroup) ? (
            <div className="msg__header">{senderInfo.name}</div>
          ) : null
        }
        {
          (isContinuation) ? null : (
            <span className={`msg__tail_${(areYouTheSender) ? 'self' : 'recipient'}`} />
          )
        }
        <div className="msg__content">{msg.content}</div>
        <div className="msg__footer">
          {TimingUtils(msg.sent_at, true)}
          {
            (areYouTheSender) ? (
              <span className={`icon msg__footer_tick msg__footer_tick-${tickClassName}`} />
            ) : null
          }
        </div>
      </div>
    </div>
  );
};
MsgInfo.propTypes = {
  msg: PropTypes.shape({
    id: PropTypes.string.isRequired,
    sender: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['TXT', 'IMG']).isRequired,
    ref: PropTypes.string,
    sent_at: PropTypes.string.isRequired,
    delivered_at: PropTypes.string,
    read_at: PropTypes.string,
  }).isRequired,
  areYouTheSender: PropTypes.bool.isRequired,
  senderInfo: PropTypes.shape({
    phone: PropTypes.string.isRequired,
    name: PropTypes.string,
    avatar: PropTypes.string,
  }).isRequired,
  isContinuation: PropTypes.bool,
  isGroup: PropTypes.bool,
};
MsgInfo.defaultProps = {
  isContinuation: false,
  isGroup: false,
};

class MessageListContainer extends Component {
  constructor(props) {
    super(props);

    this.containerDom = null;
    this.unSubscribeFromOnResize = null;
  }
  componentDidMount() {
    this.unSubscribeFromOnResize = subscribeToOnResize.addListener(this.onWindowResize);
    this.scrollToBottom();
  }
  componentDidUpdate() {
    // When new message comes in, scroll to the bottom.
    this.scrollToBottom();
  }
  componentWillUnmount() {
    this.unSubscribeFromOnResize();
  }
  onWindowResize = () => {
    const domNode = this.containerDom || document.getElementById('msg-list-container');

    if (domNode) {
      // Window's height - (height of header (56) + height of search bar (62))
      domNode.style.height = `${(window.innerHeight - 118)}px`;
    }
  }
  scrollToBottom = () => {
    const domNode = this.containerDom || document.getElementById('msg-list-container');

    domNode.scrollTop = (domNode.scrollHeight - domNode.clientHeight);
  }
  renderEachMsg = () => {
    const msgList = [];
    const { thread, userId, contactList, isGroup } = this.props;

    let lastMsgSenderId = null;

    for (let i = 0; i < thread.length; i += 1) {
      const areYouTheSender = (thread[i].sender === userId);
      const senderInfo = contactList.filter(contact => contact.phone === thread[i].sender)[0];

      msgList.push(
        <MsgInfo
          key={thread[i].id}
          msg={thread[i]}
          areYouTheSender={areYouTheSender}
          senderInfo={senderInfo}
          isContinuation={lastMsgSenderId === thread[i].sender}
          isGroup={isGroup}
        />,
      );

      lastMsgSenderId = thread[i].sender;
    }

    return msgList;
  }
  render() {
    return (
      <section
        id="msg-list-container"
        ref={(node) => { this.containerDom = node; }}
        className="msg-list__container"
        style={{ height: `${(window.innerHeight - 118)}px` }}
      >
        <div
          className="msg-list__background-image"
        />
        <div className="msg-list__body">
          {this.renderEachMsg()}
        </div>
      </section>
    );
  }
}

MessageListContainer.propTypes = {
  userId: PropTypes.string.isRequired,
  thread: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    content: PropTypes.string,
    sender: PropTypes.string,
    type: PropTypes.oneOf(['TXT', 'IMG']),
  })),
  contactList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
  })),
  isGroup: PropTypes.bool,
};
MessageListContainer.defaultProps = {
  thread: [],
  contactList: [],
  isGroup: false,
};

export default MessageListContainer;
