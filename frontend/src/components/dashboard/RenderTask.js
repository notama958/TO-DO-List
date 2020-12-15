import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { delTask, toggleChecked } from '../../actions/list';
const RenderTask = ({ task: { text, check, id }, delTask, toggleChecked }) => {
  const setChecked = (index) => {
    index.check ? (index.check = false) : (index.check = true);
    toggleChecked(index);
  };

  const deleteTask = (index) => {
    delTask(index.id);
  };
  return (
    <Fragment>
      <li
        className={`task-element ${check ? 'checked' : ''}`}
        onClick={() => setChecked({ id, check })}
      >
        {text.length > 0 && text}
        <button
          className=" btn btn--danger fas fa-times close"
          onClick={() => deleteTask({ id })}
        ></button>
      </li>
    </Fragment>
  );
};

RenderTask.propTypes = {
  task: PropTypes.object.isRequired,
  delTask: PropTypes.func.isRequired,
  toggleChecked: PropTypes.func.isRequired,
};

export default connect(null, { delTask, toggleChecked })(RenderTask);
