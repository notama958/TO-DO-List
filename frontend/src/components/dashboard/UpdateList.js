import React, { Fragment, useRef } from 'react';
import PropTypes from 'prop-types';
import store from '../../store';
import { connect } from 'react-redux';
import RenderTask from './RenderTask';
import TaskView from './TaskView';
import {
  updateList,
  editToggle,
  backdropToggle,
  getListById,
  removeList,
} from '../../actions/list';
const UpdateList = ({
  updateList,
  list: { list, tasks },
  editToggle,
  backdropToggle,
  removeList,
  getListById,
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
    tasks.forEach((item) => {
      delete item.id;
      newArray.push(item);
    });
    setFormData(
      inputTitle.current.value,
      parseInt(inputStars.current.value),
      newArray
    );
    // console.log(list[0]._id);
    updateList(list[0]._id, formData);
    editToggle(false, list[0]._id);
    backdropToggle(false);
    removeList(list[0]._id);
    setTimeout(() => getListById(list[0]._id), 3000); // ensure the updatelist first
  };
  return (
    <Fragment>
      <div className="modal card " id="add-modal">
        <div className="modal__content">
          {/* <form className="form" id="my-form"> */}
          <label htmlFor="title">List Name</label>
          <input
            type="text"
            name="title"
            ref={inputTitle}
            defaultValue={list[0].list.title}
          />
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
            defaultValue={list[0].list.stars}
          />
          <label htmlFor="title">Enter your task in the box below</label>
          <TaskView />
          <Fragment>
            <ul id="task-list" data-limit={5}>
              {tasks &&
                tasks.map((pt, index) => (
                  <RenderTask key={index} task={pt} />
                ))}{' '}
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
              editToggle(false, list[0]._id);
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
            Save
          </button>
        </div>
      </div>
    </Fragment>
  );
};

UpdateList.propTypes = {
  updateList: PropTypes.func.isRequired,
  editToggle: PropTypes.func.isRequired,
  backdropToggle: PropTypes.func.isRequired,
  removeList: PropTypes.func.isRequired,
  getListById: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  list: state.list,
});

export default connect(mapStateToProps, {
  updateList,
  editToggle,
  backdropToggle,
  removeList,
  getListById,
})(UpdateList);
