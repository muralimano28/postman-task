import React, { PropTypes } from 'react';

import { TimingUtils } from '../../utils';

import defaultProfilePic from '../../assets/images/default-profile-pic.svg';

import './style.css';

const ThreadInfo = ({
  recipientId,
  name,
  avatar,
  senderType,
  msg,
  isGroup,
  senderName,
  onSelectingContact,
  className,
}) => {
  let tickClassName = '';
  const msgTime = TimingUtils(msg.sent_at);
  if (senderType === 'SELF') {
    if (msg.read_at) {
      tickClassName = 'double-blue';
    } else if (msg.delivered_at) {
      tickClassName = 'double';
    } else {
      tickClassName = 'single';
    }
  }

  return (
    <li className={`list thread-info ${(className) ? 'thread-info_' : ''}${className}`}>
      <a className="thread-info__link" href="#/" onClick={(ev) => { ev.preventDefault(); onSelectingContact(recipientId, isGroup); }}>
        <div className="thread-info__avatar-container">
          <div className="thread-info__avatar-container_avatar">
            <img src={avatar} alt={name} />
          </div>
        </div>
        <div className="thread-info__msg-container">
          <div className="thread-info__recipient-info-container">
            <span className="thread-info__recipient-name">{name}</span>
            <span className="thread-info__msg-time">{msgTime}</span>
          </div>
          <div className="thread-info__msg-info-container">
            {(senderType === 'SELF') ? <span className={`icon thread-info__tick thread-info__tick_${tickClassName}`} /> : null}
            {(isGroup && senderType !== 'SELF') ? <span className="thread-info__sender-name">{senderName}</span> : null}
            <span className="thread-info__msg-content">{msg.content}</span>
          </div>
        </div>
      </a>
    </li>
  );
};
ThreadInfo.propTypes = {
  recipientId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  senderType: PropTypes.oneOf(['SELF', 'RECIPIENT']).isRequired,
  msg: PropTypes.shape({
    id: PropTypes.string.isRequired,
    sent_at: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['TXT', 'IMG']).isRequired,
  }).isRequired,
  isGroup: PropTypes.bool.isRequired,
  senderName: PropTypes.string,
  onSelectingContact: PropTypes.func.isRequired,
  className: PropTypes.string,
};
ThreadInfo.defaultProps = {
  avatar: defaultProfilePic,
  senderName: null,
  className: '',
};

export default ThreadInfo;
