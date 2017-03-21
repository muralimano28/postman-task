import React, { Component, PropTypes } from 'react';

import SearchBox from '../search-box';
import './style.css';

import { subscribeToOnResize } from '../../utils';

export default class Compose extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
    };
    this.contentListDom = null;
    this.unSubscribeFromOnResize = null;
  }
  componentDidMount() {
    this.unSubscribeFromOnResize = subscribeToOnResize.addListener(this.onWindowResize);
  }
  componentWillUnmount() {
    this.unSubscribeFromOnResize();
  }

  onChangeHandler = (value) => {
    this.setState({
      searchText: value,
    });
  }
  onWindowResize = () => {
    const domNode = this.contentListDom || document.getElementById('compose-contact-list');

    if (domNode) {
      // Window's height - (height of header (108) - height of search bar (50))
      domNode.style.height = `${(window.innerHeight - 158)}px`;
    }
  }
  getFilteredContacts = () => {
    const { searchText } = this.state;
    const { contacts } = this.props;
    const contactList = {};
    const alphabets = Object.keys(this.props.contacts);

    for (let i = 0; i < alphabets.length; i += 1) {
      contactList[alphabets[i]] = contacts[alphabets[i]].filter(
        contact => contact.name.toLowerCase().search(searchText.toLowerCase()) >= 0,
      );
    }
    return contactList;
  }
  renderContacts = (contacts) => {
    const contactList = [];
    const alphabets = Object.keys(this.props.contacts);
    const { contactSelectCB } = this.props;

    for (let i = 0; i < alphabets.length; i += 1) {
      const list = contacts[alphabets[i]].map(contact => (
        <li className="list" key={contact.phone}>
          <button
            className="button compose__contact-list_button"
            id={contact.phone}
            onClick={(ev) => { contactSelectCB(ev.target.id); }}
          >{contact.name}</button>
        </li>
      ));

      if (list.length) {
        contactList.push(
          (<li className="list" key={`contact-${alphabets[i]}`}>
            <h2 className="compose__contact-list_header">{alphabets[i]}</h2>
          </li>),
          list,
        );
      }
    }
    if (contactList.length) {
      return contactList;
    }
    return (
      <p className="compose__error-msg">No contacts found</p>
    );
  }

  render() {
    const { searchText } = this.state;

    const filteredList = (searchText) ? this.getFilteredContacts() : this.props.contacts;

    return (
      <div className="compose">
        <SearchBox
          value={searchText}
          onInputChange={this.onChangeHandler}
          className="compose__search-box"
        />
        <ul
          id="compose-contact-list"
          className="noul compose__contact-list"
          style={{ height: `${window.innerHeight - 158}px` }}
        >
          { this.renderContacts(filteredList) }
        </ul>
      </div>
    );
  }
}
Compose.propTypes = {
  contacts: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
  }))),
  contactSelectCB: PropTypes.func.isRequired,
};
Compose.defaultProps = {
  contacts: [],
};
