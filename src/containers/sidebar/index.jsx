import React, { Component, PropTypes } from 'react';

import Store from '../../store';

import './style.css';

import Compose from '../../components/compose';
import SiderbarContent from '../../components/sidebar-content';
import Drawer from '../../components/drawer';
import SidebarHeader from '../../components/sidebar-header';

const Status = () => (
  <h2>I am Status</h2>
);

export default class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOnline: true,
      showDrawer: false,
      drawerContentType: null,
    };
  }
  componentDidMount() {
    window.addEventListener('online', this.changeStatusToOnline);
    window.addEventListener('offline', this.changeStatusToOffline);
  }
  componentWillUnmount() {
    window.removeEventListener('online', this.changeStatusToOnline);
    window.removeEventListener('online', this.changeStatusToOffline);
  }
  getDrawerContent = () => {
    const { drawerContentType } = this.state;

    switch (drawerContentType) {
      case 'COMPOSE_MSG':
        return {
          heading: 'New chat',
          content: (
            <Compose
              contacts={this.props.contactList}
              contactSelectCB={this.contactSelectHandler}
            />
          ),
        };
      default:
        return null;
    }
  }
  closeDrawerHandler = () => {
    this.setState({
      showDrawer: false,
      drawerContentType: null,
    });
  }
  changeStatusToOnline = () => {
    this.setState({
      isOnline: true,
    });
  }
  changeStatusToOffline = () => {
    this.setState({
      isOnline: false,
    });
  }
  clickComposeHandler = () => {
    this.setState({
      showDrawer: true,
      drawerContentType: 'COMPOSE_MSG',
    });
  }
  contactSelectHandler = (value, isGroup) => {
    this.closeDrawerHandler();
    Store.dispatch({
      type: 'SET_ACTIVE_CHAT',
      value,
      isGroup,
    });
  }

  render() {
    const { isOnline, showDrawer } = this.state;
    const { avatar, name, threads, contactList, groups, id, activeChat } = this.props;

    let icon = null;
    let sidebarContent = null;
    let drawerContent = null;

    if (!isOnline) {
      icon = (
        <div className="icon icon__alert" />
      );
    }
    if (showDrawer) {
      drawerContent = this.getDrawerContent();
      sidebarContent = (
        <Drawer
          header={drawerContent.heading}
          content={drawerContent.content}
          closeDrawerCB={this.closeDrawerHandler}
        />
      );
    } else {
      let filteredContactList = [];
      const alphabets = Object.keys(contactList);

      for (let i = 0; i < alphabets.length; i += 1) {
        filteredContactList = [
          ...filteredContactList,
          ...contactList[alphabets[i]],
        ];
      }
      sidebarContent = (
        <div>
          <SidebarHeader
            avatar={avatar}
            name={name}
            clickComposeCB={this.clickComposeHandler}
          />
          {
            (isOnline) ? (null) : (
              <Status
                icon={icon}
                heading="Computer not connected"
                content="Make sure your computer has an active Internet connection."
              />
            )
          }
          <SiderbarContent
            msgThreads={threads}
            contacts={filteredContactList}
            groups={groups}
            id={id}
            onSelectingContact={this.contactSelectHandler}
            activeChat={activeChat}
          />
        </div>
      );
    }

    return (
      <aside className="sidebar">
        {sidebarContent}
      </aside>
    );
  }
}
Sidebar.propTypes = {
  avatar: PropTypes.string,
  name: PropTypes.string.isRequired,
  contactList: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
  }))),
  threads: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    sender: PropTypes.string,
    content: PropTypes.string,
    type: PropTypes.oneOf(['TXT', 'IMG']),
  }))),
  groups: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
  })),
  id: PropTypes.string.isRequired,
  activeChat: PropTypes.string,
};
Sidebar.defaultProps = {
  avatar: null,
  contactList: {},
  threads: {},
  groups: [],
  activeChat: null,
};
