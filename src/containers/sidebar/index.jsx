import React, { Component, PropTypes } from 'react';

import Store from '../../store';

import './style.css';

import Compose from '../../components/compose';

const Header = ({ avatar, name, clickComposeCB }) => (
  <div className="header">
    <div className="header__avatar">
      <img className="header__avatar_img" src={avatar} alt={name} />
    </div>
    <div className="header__controls">
      <button className="button button__compose-btn" onClick={clickComposeCB}>C</button>
      <button className="button button__option-btn">O</button>
    </div>
  </div>
);
Header.propTypes = {
  avatar: PropTypes.string,
  name: PropTypes.string.isRequired,
  clickComposeCB: PropTypes.func,
};
Header.defaultProps = {
  avatar: null,
  clickComposeCB: () => {},
};

const Status = () => (
  <h2>I am Status</h2>
);
const Search = () => (
  <h2>I am search bar</h2>
);
const ContactList = () => (
  <h1>I am contactlist</h1>
);

const Drawer = ({ header, content, closeDrawerCB }) => (
  <div className="drawer">
    <header className="drawer__header">
      <div className="drawer__header_controls">
        <button className="button button_back-btn" onClick={closeDrawerCB}>B</button>
      </div>
      <div className="drawer__header_title-medium">{header}</div>
    </header>
    <div className="drawer__content">{content}</div>
  </div>
);

Drawer.propTypes = {
  header: PropTypes.string,
  content: PropTypes.node,
  closeDrawerCB: PropTypes.func,
};
Drawer.defaultProps = {
  header: 'Drawer heading',
  content: null,
  closeDrawerCB: () => {},
};
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
              contacts={this.props.contact_list}
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
  contactSelectHandler = (phone) => {
    this.closeDrawerHandler();
    Store.dispatch({
      type: 'ADD_NEW_THREAD',
      value: phone,
    });
  }

  render() {
    const { isOnline, showDrawer } = this.state;
    const { avatar, name } = this.props;

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
      sidebarContent = (
        <div>
          <Header
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
          <Search />
          <ContactList />
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
  contact_list: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
  }))),
};
Sidebar.defaultProps = {
  avatar: null,
  contact_list: {},
};
