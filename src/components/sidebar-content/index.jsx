import React, { Component, PropTypes } from 'react';

import Search from '../search-box';
import ThreadInfo from '../thread-info';

import './style.css';

import { subscribeToOnResize } from '../../utils';

class SiderbarContent extends Component {
  static propTypes = {
    msgThreads: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      sender: PropTypes.string,
      content: PropTypes.string,
      type: PropTypes.oneOf(['TXT', 'IMG']),
    }))),
    contacts: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      phone: PropTypes.string,
    })),
    groups: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.string,
    })),
    id: PropTypes.string.isRequired,
    onSelectingContact: PropTypes.func.isRequired,
    activeChat: PropTypes.string,
  };
  static defaultProps = {
    msgThreads: {},
    contacts: {},
    groups: [],
    activeChat: null,
  };
  state = {
    searchText: '',
  };

  componentDidMount() {
    this.unSubscribeFromOnResize = subscribeToOnResize.addListener(this.onWindowResize);
  }
  componentWillUnmount() {
    if (this.unSubscribeFromOnResize) {
      this.unSubscribeFromOnResize();
    }
  }

  onWindowResize = () => {
    const domNode = this.contentListDom || document.getElementById('sidebar-chat-thread-list');

    if (domNode) {
      // Window's height - (height of header - height of search bar)
      domNode.style.height = `${(window.innerHeight - 90)}px`;
    }
  }
  onSearch = (searchText) => {
    this.setState({
      searchText,
    });
  }
  getContent = () => {
    const { searchText } = this.state;
    const { msgThreads, contacts, groups, id, onSelectingContact, activeChat } = this.props;

    const contentArray = [];

    if (searchText) {
      // Show threads and contact list.
    } else {
      // Show threads alone.
      const threadIds = Object.keys(msgThreads);

      for (let i = 0; i < threadIds.length; i += 1) {
        const eachThread = msgThreads[threadIds[i]];
        // threadIds[i] is the phone number of recipient or groupId.
        // You can find contact information by looping throught contacts
        // and matching phone number with id.


        if (eachThread.length) {
          const lastMsg = eachThread[eachThread.length - 1];
          const lastMsgSenderInfo = contacts.filter(contact => contact.phone === lastMsg.sender)[0];
          const senderType = (id === lastMsgSenderInfo.phone) ? 'SELF' : 'RECIPIENT';

          let recipientInfo = contacts.filter(contact => contact.phone === threadIds[i])[0];
          let isGroup = false;

          if (!recipientInfo) {
            // Then group is the recipient. So get groupInfo.
            recipientInfo = groups.filter(group => group.id === threadIds[i])[0];
            isGroup = true;
          }

          contentArray.push(
            (
              <ThreadInfo
                key={lastMsg.id}
                recipientId={recipientInfo.phone || recipientInfo.id}
                name={recipientInfo.name}
                avatar={recipientInfo.avatar}
                msg={lastMsg}
                senderType={senderType}
                isGroup={isGroup}
                senderName={lastMsgSenderInfo.name}
                onSelectingContact={onSelectingContact}
                className={(recipientInfo.phone === activeChat || recipientInfo.id === activeChat) ? 'active' : ''}
              />
            ),
          );
        }
      }
    }
    return contentArray;
  }
  contentListDom = null;
  unSubscribeFromOnResize = null;
  render() {
    const { searchText } = this.state;
    const contentHeight = window.innerHeight - 90;

    return (
      <div className="sidebar-content">
        <Search
          value={searchText}
          onInputChange={this.onSearch}
          className="sidebar-content__search-box"
          placeholder="Search or start a new chat"
        />
        <ul
          id="sidebar-chat-thread-list"
          ref={(node) => { this.contentListDom = node; }}
          className="noul sidebar-content__list"
          style={{ height: `${contentHeight}px` }}
        >
          {this.getContent()}
        </ul>
      </div>
    );
  }
}

export default SiderbarContent;
