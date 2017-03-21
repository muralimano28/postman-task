import React, { PropTypes } from 'react';

import './style.css';

const Drawer = ({ header, content, closeDrawerCB }) => (
  <div className="drawer">
    <header className="drawer__header">
      <div className="drawer__header_controls">
        <button className="button button__back-btn" onClick={closeDrawerCB} />
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

export default Drawer;
