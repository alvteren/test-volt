import './Headline.css';

import React from 'react';
import PropTypes from 'prop-types';

const Headline = props => {
  const { title, actionComponent: ActionComponent } = props;

  return (
    <div className="headline">
      <h1 className="headline__title">{title}</h1>
      {ActionComponent && <ActionComponent className="headline__action" />}
    </div>
  );
};

Headline.propTypes = {
  title: PropTypes.string.isRequired,
  actionComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.node])
};
Headline.defaultProps = {
  actionComponent: null
};

export default Headline;
