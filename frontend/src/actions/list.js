import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_LIST,
  GET_LIST_BYID,
  UPDATE_LIST,
  DELETE_LIST,
  LIST_NOT_FOUND,
  EMPTY_NOTE_LIST,
  ADD_LIST,
  UPDATE_ERROR,
  BACKDROP_OFF,
  MODAL_OFF,
  MODAL_ON,
  BACKDROP_ON,
  ADD_TASK,
  NONE_OBJECT,
  REMOVE_TASK,
  REMOVE,
  TOGGLE_TASK,
  EDIT_ON,
  EDIT_OFF,
  COPY_TASK,
} from './types';

// get 1 random
//api : api/v1/task/random
export const getRandomList = () => async (dispatch) => {
  try {
    const res = await axios.get('api/v1/task/random');
    dispatch({
      type: GET_LIST,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert('DATABASE IS EMPTY', 'danger'));
    dispatch({
      type: EMPTY_NOTE_LIST,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// get 1 list by id
//api : api/v1/task/list/:id
export const getListById = (listId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/task/list/${listId}`);
    dispatch({
      type: GET_LIST_BYID,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert('INVALID ID', 'danger'));
    dispatch({
      type: LIST_NOT_FOUND,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// add list
//api : api/v1/task/list/
export const addList = (formData) => async (dispatch) => {
  try {
    // const config = {
    //   headers: {
    //     'content-type': 'application/json',
    //   },
    // };
    const res = await axios.post(`/api/v1/task/list`, formData);
    dispatch({
      type: ADD_LIST,
      payload: res.data,
    });
    dispatch(setAlert('LIST ADDED', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: EMPTY_NOTE_LIST,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//api : api/v1/task/list/
export const addRandom = () => async (dispatch) => {
  try {
    const res = await axios.post(`/api/v1/task/list/random`);
    dispatch({
      type: ADD_LIST,
      payload: res.data,
    });
    dispatch(setAlert('RANDOM LIST ADDED', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg), 'danger'));
    }
    dispatch({
      type: EMPTY_NOTE_LIST,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//update list by id
// api: api/v1/task/list/:id
export const updateList = (id, formData) => async (dispatch) => {
  try {
    const res = await axios.put(`api/v1/task/list/${id}`, formData);
    dispatch({
      type: UPDATE_LIST,
      payload: res.data,
    });
    dispatch(setAlert('LIST UPDATED', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg), 'danger'));
    }
    dispatch({
      type: UPDATE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// delete list by id
//api: api/v1/task/list/:id
export const deleteList = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`api/v1/task/list/${id}`);
    dispatch({
      type: DELETE_LIST,
      payload: id,
    });
    dispatch(setAlert('LIST REMOVED', 'success'));
  } catch (err) {
    dispatch({
      type: LIST_NOT_FOUND,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const modalToggle = (stt) => (dispatch) => {
  if (stt) {
    dispatch({
      type: MODAL_ON,
    });
  } else {
    dispatch({
      type: MODAL_OFF,
    });
  }
};
export const editToggle = (stt, id) => (dispatch) => {
  if (stt) {
    dispatch({
      type: EDIT_ON,
      payload: id,
    });
  } else {
    dispatch({
      type: EDIT_OFF,
      payload: null,
    });
  }
};
export const backdropToggle = (stt) => (dispatch) => {
  if (stt) {
    dispatch({
      type: BACKDROP_ON,
    });
  } else {
    dispatch({
      type: BACKDROP_OFF,
    });
  }
};

export const addTask = (obj) => (dispatch) => {
  if (obj) {
    dispatch({
      type: ADD_TASK,
      payload: obj,
    });
  } else {
    dispatch({
      type: NONE_OBJECT,
      payload: null,
    });
  }
};
export const delTask = (id) => (dispatch) => {
  if (id) {
    dispatch({
      type: REMOVE_TASK,
      payload: id,
    });
  } else {
    dispatch({
      type: NONE_OBJECT,
      payload: null,
    });
  }
};
export const copyTask = (obj) => (dispatch) => {
  if (obj) {
    dispatch({
      type: COPY_TASK,
      payload: obj,
    });
  } else {
    dispatch({
      type: NONE_OBJECT,
      payload: null,
    });
  }
};
export const toggleChecked = (obj) => (dispatch) => {
  if (obj) {
    dispatch({
      type: TOGGLE_TASK,
      payload: obj,
    });
  } else {
    dispatch({
      type: NONE_OBJECT,
      payload: null,
    });
  }
};
export const removeList = (id) => (dispatch) => {
  if (id) {
    dispatch({
      type: REMOVE,
      payload: id,
    });
  } else {
    dispatch({
      type: NONE_OBJECT,
      payload: null,
    });
  }
};
