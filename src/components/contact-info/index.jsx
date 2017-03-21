import React, { PropTypes } from 'react';

import './style.css';

import defaultProfilePic from '../../assets/images/default-profile-pic.svg';

const ContactInfo = ({
  name,
  phone,
  avatar,
  searchText,
  onSelectingContact,
  isGroup,
}) => {
  let highLightedName = null;

  if (searchText && searchText !== '') {
    const pattern = new RegExp(`(${searchText})([.]*)`, 'gi');
    highLightedName = name.replace(pattern, "<span class='hightlight'>$1</span>");

    if (highLightedName === name) {
      return null;
    }
  }

  return (
    <li className="list contact-info">
      <a
        className="link contact-info__link"
        href="#/"
        onClick={(ev) => { ev.preventDefault(); onSelectingContact(phone, isGroup); }}
      >
        <div className="contact-info__avatar-container">
          <img src={avatar} alt={name} />
        </div>
        {
          (searchText && searchText !== '') ? (
            /* eslint-disable */
            <div
              className="contact-info__name"
              dangerouslySetInnerHTML={{ __html: highLightedName }}
            />
            /* eslint-enable */
          ) : (
            <div className="contact-info__name">{name}</div>
          )
        }
      </a>
    </li>
  );
};

ContactInfo.propTypes = {
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  searchText: PropTypes.string,
  onSelectingContact: PropTypes.func.isRequired,
  isGroup: PropTypes.bool,
};

ContactInfo.defaultProps = {
  avatar: defaultProfilePic,
  searchText: '',
  isGroup: false,
};

export default ContactInfo;
