import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ShowId = ({ listid }) => {
  return (
    <Fragment>
      <li className=" fas fa-check-circle  ">{listid}</li>
    </Fragment>
  );
};

ShowId.propTypes = {
  listid: PropTypes.string.isRequired,
};

export default ShowId;
