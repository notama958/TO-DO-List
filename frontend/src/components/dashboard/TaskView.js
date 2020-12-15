import React, { useState, Fragment, useRef } from 'react';
import PropTypes from 'prop-types';
import { addTask } from '../../actions/list';
import { connect } from 'react-redux';
import store from '../../store';
const TaskView = ({ addTask }) => {
  // delayed update => bugs + remove
  const [taskArray, updateTaskArray] = useState([]);
  const inputRef = useRef(null);
  let number = 0;
  let smallform = { text: '', check: false };
  const setTask = (txt) => {
    smallform.id = Math.random() * 10000;
    smallform.text = txt;
    smallform.check = false;
  };
  // useEffect(() => {
  //   number = store.getState().list.tasks.length;
  // });
  const onSubmit = (e) => {
    e.preventDefault();
    let enterText = inputRef.current.value;
    if (enterText.length > 0 && number < 5) {
      setTask(enterText);
      if (smallform.text.length > 0) {
        updateTaskArray([...taskArray, smallform]);
        addTask(smallform);
      }
    } else {
      alert('MAX entered is 5');
    }
    inputRef.current.value = '';
  };

  return (
    <Fragment>
      <div className="tableList">
        <input
          name="text"
          type="text"
          id="taskValue"
          placeholder="What are you thinking?"
          ref={inputRef}
        />
        <button
          id="createListNode"
          className="btn btn--success"
          onClick={(e) => onSubmit(e)}
        >
          Add
        </button>{' '}
      </div>
    </Fragment>
  );
};

TaskView.propTypes = {
  addTask: PropTypes.func.isRequired,
};

export default connect(null, { addTask })(TaskView);
