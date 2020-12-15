import React, { Fragment, useRef } from 'react';
import PropTypes from 'prop-types';
import { addList, backdropToggle, modalToggle } from '../../actions/list';
import { connect } from 'react-redux';
import TaskView from './TaskView';
import RenderTask from './RenderTask';
import store from '../../store';

const ListForm = ({
  addList,
  backdropToggle,
  modalToggle,
  list: { tasks },
}) => {
  const inputTitle = useRef(null);
  const inputStars = useRef(null);

  let formData = { title: '', stars: 3, tasks: [] };
  // const { title, stars, emptyTasks } = formData;
  const setFormData = (title, stars, mytasks) => {
    formData.title = title;
    formData.stars = stars;
    mytasks.length > 0 &&
      mytasks.forEach((el) => {
        let newObj = el;
        formData.tasks.push(newObj);
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newArray = [];
    store.getState().list.tasks.forEach((item) => {
      delete item.id;
      newArray.push(item);
    });
    console.log(newArray);
    setFormData(
      inputTitle.current.value,
      parseInt(inputStars.current.value),
      newArray
    );
    console.log(formData);
    addList(formData);
    setFormData(' ', 3, []);
    modalToggle(false);
    backdropToggle(false);
  };

  return (
    <Fragment>
      <div className="modal card " id="add-modal">
        <div className="modal__content">
          {/* <form className="form" id="my-form"> */}
          <label htmlFor="title">List Name</label>
          <input type="text" name="title" ref={inputTitle} />
          <label htmlFor="rating">Importance </label>
          <input
            type="number"
            step="1"
            max="5"
            min="1"
            name="stars"
            id="rating"
            placeholder="Enter the rating star"
            ref={inputStars}
          />
          <label htmlFor="title">Enter your task in the box below</label>
          <TaskView />
          <Fragment>
            <ul id="task-list" data-limit={5}>
              {tasks.map((pt, index) => (
                <RenderTask key={index} task={pt} />
              ))}
            </ul>{' '}
          </Fragment>

          {/* </form> */}
        </div>
        <div className="modal__actions">
          <button
            className="btn btn--passive"
            type="buton"
            onClick={(e) => {
              e.preventDefault();
              modalToggle(false);
              setFormData(' ', 3, []);
              backdropToggle(false);
            }}
          >
            Cancel
          </button>
          <button
            form="my-task"
            className="btn btn--success"
            type="submit"
            onClick={(e) => onSubmit(e)}
          >
            Save new
          </button>
        </div>
      </div>
    </Fragment>
  );
};

ListForm.propTypes = {
  addList: PropTypes.func.isRequired,
  backdropToggle: PropTypes.func.isRequired,
  modalToggle: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  list: state.list,
});

export default connect(mapStateToProps, {
  addList,
  backdropToggle,
  modalToggle,
})(ListForm);
