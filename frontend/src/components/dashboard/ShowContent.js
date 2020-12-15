import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  deleteList,
  editToggle,
  backdropToggle,
  copyTask,
} from '../../actions/list';
import store from '../../store';

const ShowContent = ({
  mylist: {
    list: { title, stars, tasks },
    _id,
  },
  list: { edit, list },
  deleteList,
  editToggle,
  backdropToggle,
  copyTask,
}) => {
  const imgUrls = [
    '/img/cute1.png',
    '/img/cute2.png',
    '/img/cute3.png',
    '/img/cute4.png',
    '/img/cute5.png',
  ];
  const convertTask = (tsk) => {
    let newTasks = [];
    // console.log(tsk);
    tsk.map((obj) => {
      obj.id = Math.random() * 10000;
      newTasks.push(obj);
    });
    return newTasks;
  };
  return (
    <Fragment>
      {!edit && (
        <li className="list-element">
          <div className="list-element__image ">
            <img
              src={
                window.location.origin +
                imgUrls[[Math.floor(Math.random() * (5 - 1 + 1))]]
              }
              className="round-img"
            />
          </div>
          <div className="list-element__info ">
            <div className="wrapper-title alert-dark">
              <h2>{title}</h2>
              <p>{stars}/5 stars</p>
            </div>
            <div className="wrapper-content ">
              <ul>
                {tasks.map((tsk, index) => (
                  <li
                    className={`task-element ${tsk.check ? 'checked' : ''}`}
                    key={index}
                  >
                    {tsk.text}
                  </li>
                ))}
              </ul>
              <button
                className="btn  btn-primary update"
                onClick={() => {
                  backdropToggle(true);
                  editToggle(true, _id);
                  copyTask(convertTask(tasks));
                }}
              >
                EDIT
              </button>
              <button
                className="btn  btn-danger delete "
                onClick={() => deleteList(_id)}
              >
                DELETE
              </button>
            </div>
          </div>
        </li>
      )}
    </Fragment>
  );
};

ShowContent.propTypes = {
  editToggle: PropTypes.func.isRequired,
  backdropToggle: PropTypes.func.isRequired,
  deleteList: PropTypes.func.isRequired,
  copyTask: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  list: state.list,
});

export default connect(mapStateToProps, {
  deleteList,
  editToggle,
  backdropToggle,
  copyTask,
})(ShowContent);
