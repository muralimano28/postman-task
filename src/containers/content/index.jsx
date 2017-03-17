import React from 'react';

import './style.css';

const Header = () => (
  <h1>I am header</h1>
);
const MsgThread = () => (
  <h1>I am msg thread</h1>
);

const Content = () => (
  <section className="content">
    <Header />
    <MsgThread />
  </section>
);
// Content.propTypes = {
//   threads: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.shape({
//     id: PropTypes.string,
//     content: PropTypes.string,
//     sender: PropTypes.string,
//   }))),
// };

export default Content;
