import React, { PropTypes } from 'react';

import './style.css';

import defaultProfilePic from '../../assets/images/default-profile-pic.svg';

const Header = ({ avatar, name, id, isGroup, groupMembers }) => (
  <div className="header content-header">
    <div className="header__avatar">
      <img className="header__avatar_img" src={avatar} alt={name || id} />
    </div>
    <div className="header__info">
      <h2
        className={`header__info-title ${(isGroup) ? 'header__group-title' : ''}`}
      >{name || id}</h2>
      {
        (isGroup) ? (
          <p className="header__info-recipients">{groupMembers.join(', ')}</p>
        ) : null
      }
    </div>
    <div className="header__controls">
      <button className="button button__option-btn" />
    </div>
  </div>
);
Header.propTypes = {
  avatar: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  isGroup: PropTypes.bool,
  groupMembers: PropTypes.arrayOf(PropTypes.string),
};
Header.defaultProps = {
  avatar: defaultProfilePic,
  name: '',
  id: '',
  isGroup: false,
  groupMembers: [],
};

export default Header;
