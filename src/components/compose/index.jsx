import React, { Component, PropTypes } from 'react';

import SearchBox from '../search-box';
import './style.css';

export default class Compose extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
    };
  }
  onChangeHandler = (value) => {
    this.setState({
      searchText: value,
    });
  }
  getFilteredContacts = () => {
    const { searchText } = this.state;
    const { contacts } = this.props;
    const contactList = {};
    const alphabets = Object.keys(this.props.contacts);

    for (let i = 0; i < alphabets.length; i += 1) {
      contactList[alphabets[i]] = contacts[alphabets[i]].filter(
        contact => contact.name.toLowerCase().search(searchText) >= 0,
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
        <li key={contact.phone}>
          <button
            className="button list__button"
            id={contact.phone}
            onClick={(ev) => { contactSelectCB(ev.target.id); }}
          >{contact.name}</button>
        </li>
      ));

      if (list.length) {
        contactList.push(
          <li key={`contact-${alphabets[i]}`}><h2 className="list__header">{alphabets[i]}</h2></li>,
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
        />
        <ul className="noul list">
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
