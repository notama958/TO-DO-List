import {
  DELETE_LIST,
  LIST_NOT_FOUND,
  ADD_LIST,
  GET_LIST,
  GET_LIST_BYID,
  EMPTY_NOTE_LIST,
  UPDATE_ERROR,
  BACKDROP_OFF,
  MODAL_OFF,
  BACKDROP_ON,
  MODAL_ON,
  ADD_TASK,
  REMOVE_TASK,
  NONE_OBJECT,
  TOGGLE_TASK,
  EDIT_ON,
  EDIT_OFF,
  COPY_TASK,
  REMOVE,
} from '../actions/types';

const initState = {
  list: null,
  ids: [], // list of id
  lists: [], // get one list full info
  loading: true,
  error: {},
  modal: false,
  edit: false,
  backdrop: false,
  tasks: [],
};

export default function (state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_LIST:
      return {
        ...state,
        lists: [...state.lists, payload[0]],
        loading: false,
      };
    case GET_LIST_BYID:
      return {
        ...state,
        lists: [...state.lists, payload],
        loading: false,
      };
    case ADD_LIST:
      return {
        ...state,
        ids: [...state.ids, payload],
        loading: false,
      };
    case DELETE_LIST:
      return {
        ...state,
        lists: state.lists.filter((list) => list._id !== payload),
        ids: state.ids.filter((id) => id !== payload),
        loading: true,
      };
    case UPDATE_ERROR:
    case EMPTY_NOTE_LIST:
    case LIST_NOT_FOUND:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case BACKDROP_OFF:
    case MODAL_OFF:
      return {
        ...state,
        loading: false,
        modal: false,
        tasks: [],
        backdrop: false,
      };
    case MODAL_ON:
      return {
        ...state,
        loading: false,
        modal: true,
        tasks: [],
      };
    case COPY_TASK:
      return {
        ...state,
        tasks: payload,
      };
    case EDIT_ON:
      return {
        ...state,
        loading: false,
        edit: true,
        list: state.lists.filter((list) => list._id === payload),
      };
    case REMOVE:
      return {
        ...state,
        lists: state.lists.filter((list) => list._id !== payload),
        loading: false,
      };
    case EDIT_OFF:
      return {
        ...state,
        loading: false,
        edit: false,
        list: null,
        backdrop: false,
        tasks: [],
      };
    case BACKDROP_ON:
      return {
        ...state,
        backdrop: true,
      };
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, payload],
        loading: false,
      };
    case REMOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== payload),
        loading: false,
      };
    case TOGGLE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((el) =>
          el.id === payload.id
            ? {
                ...el,
                check: payload.check,
              }
            : el
        ),
        loading: false,
      };

    case NONE_OBJECT:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
