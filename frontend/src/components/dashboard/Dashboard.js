import React, { Fragment, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  modalToggle,
  backdropToggle,
  getRandomList,
  getListById,
  addRandom,
} from '../../actions/list';
import ListForm from './ListForm';
import Backdrop from '../layout/Backdrop';
import ShowContent from './ShowContent';
import ShowId from './ShowId';
import UpdateList from './UpdateList';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import store from '../../store';
const Dashboard = ({
  list: { modal, backdrop, loading, ids, lists, edit },
  modalToggle,
  backdropToggle,
  getRandomList,
  getListById,
  addRandom,
}) => {
  const ID = useRef(null);
  return (
    <Provider store={store}>
      <header id="title" className="cmds">
        <label className="large text-primary post-form-header">NOTE ME</label>
        <hr />
        <button
          value="add"
          className="btn btn--green"
          onClick={() => {
            modalToggle(true);
            backdropToggle(true);
          }}
        >
          ADD{' '}
        </button>
        <button
          value="add"
          className="btn btn--green"
          onClick={() => {
            addRandom();
          }}
        >
          ADD RANDOM{' '}
        </button>
        <br />
        <button
          value="load"
          className="btn btn--danger"
          onClick={() => {
            getRandomList();
          }}
        >
          {' '}
          GET RANDOM{' '}
        </button>
        <div>
          <button
            value="get"
            className="btn btn--danger"
            onClick={() => {
              getListById(ID.current.value);
            }}
          >
            GET BY ID{' '}
          </button>
          <input type="text" name="id" ref={ID}></input>
        </div>
      </header>
      {backdrop === true ? <Backdrop /> : ' '}
      {modal === true ? <ListForm /> : ' '}
      {edit === true ? <UpdateList /> : ' '}
      {/*show items here */}
      <main>
        {ids.length <= 0 ? (
          <section id="id-text" className="card">
            <p>LIST ID shows here!</p>
          </section>
        ) : (
          <ul id="list-id" className="card">
            <p>Newly Created List ID</p>
            {ids.map((id, index) => (
              <ShowId key={index} listid={id} />
            ))}
          </ul>
        )}
        {lists.length <= 0 ? (
          <section id="entry-text" className="card">
            <p>List CONTENT shows here!</p>
          </section>
        ) : (
          <ul id="list-content">
            {lists.map((lst, index) => (
              <ShowContent
                key={index}
                mylist={lst}
                modal={modal}
                backdrop={backdrop}
              />
            ))}
          </ul>
        )}
      </main>
    </Provider>
  );
};

Dashboard.propTypes = {
  modalToggle: PropTypes.func.isRequired,
  backdropToggle: PropTypes.func.isRequired,
  getRandomList: PropTypes.func.isRequired,
  getListById: PropTypes.func.isRequired,
  addRandom: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  list: state.list,
});

export default connect(mapStateToProps, {
  modalToggle,
  backdropToggle,
  getRandomList,
  getListById,
  addRandom,
})(Dashboard);
