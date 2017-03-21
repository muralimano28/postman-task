import React, { PropTypes } from 'react';

const Header = ({ avatar, name, clickComposeCB }) => (
  <div className="header">
    <div className="header__avatar">
      <img className="header__avatar_img" src={avatar} alt={name} />
    </div>
    <div className="header__controls">
      <button className="button button__compose-btn" onClick={clickComposeCB} />
      <button className="button button__option-btn" />
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

export default Header;
