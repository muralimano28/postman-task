import React, { PropTypes } from 'react';

import ContentHeader from '../../components/content-header';
import MessageListContainer from '../../components/message-list';
import ContentFooter from '../../components/content-footer';

import Action from '../../actions';

import './style.css';

const Content = ({
  activeChat,
  activeChatContactInfo,
  isActiveChatAGroup,
  threads,
  id,
  contactList,
}) => {
  let groupMembers = [];

  const alphabets = Object.keys(contactList);
  const filteredContacts = [];

  for (let i = 0; i < alphabets.length; i += 1) {
    filteredContacts.push(
      ...contactList[alphabets[i]].map(contact => contact),
    );
  }

  if (isActiveChatAGroup) {
    groupMembers = activeChatContactInfo.recipients.map(
      contact => (contact.name || contact.phone),
    );
  }

  return (
    <section className="content">
      {
        (activeChat) ? (
          <div>
            <ContentHeader
              id={activeChatContactInfo.phone || activeChatContactInfo.id}
              avatar={activeChatContactInfo.avatar}
              name={activeChatContactInfo.name}
              isGroup={isActiveChatAGroup}
              groupMembers={groupMembers}
            />
            <MessageListContainer
              thread={threads[activeChat]}
              userId={id}
              contactList={filteredContacts}
              isGroup={isActiveChatAGroup}
            />
            <ContentFooter
              userId={id}
              activeChat={activeChat}
              onSendingMsg={(msg) => { Action.sendMsg(msg); }}
              isGroup={isActiveChatAGroup}
            />
          </div>
        ) : (
          <div className="intro">
            <div className="intro-img" />
            <h1 className="intro-title">Keep your phone connected</h1>
            <p className="intro-text">
              WhatsApp connects to your phone to sync messages.
              To reduce data usage, connect your phone to Wi-Fi.
            </p>
          </div>
        )
      }
    </section>
  );
};
Content.propTypes = {
  id: PropTypes.string.isRequired,
  activeChat: PropTypes.string,
  activeChatContactInfo: PropTypes.shape({
    phone: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    avatar: PropTypes.string,
  }),
  isActiveChatAGroup: PropTypes.bool,
  threads: PropTypes.shape({
    id: PropTypes.string,
    sender: PropTypes.string,
    content: PropTypes.string,
    type: PropTypes.oneOf(['TXT', 'IMG']),
  }),
  contactList: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
  }))),
};
Content.defaultProps = {
  activeChat: null,
  activeChatContactInfo: {},
  isActiveChatAGroup: false,
  threads: {},
  contactList: {},
};

export default Content;
