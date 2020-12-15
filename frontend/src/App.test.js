import { render, screen, act } from '@testing-library/react';
import App from './App';
import Dashboard from '../src/components/dashboard/Dashboard';
import ShowId from '../src/components/dashboard/ShowId';
import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
describe('Render cover page', () => {
  it('Checking title', () => {
    act(() => {
      render(<App />);
    });
    const linkElement = screen.getByText(/Take a note/i);
    expect(linkElement).toBeInTheDocument();
  });
});
const mockStore = configureStore([]);

describe('Redux component tests', () => {
  let store;
  let component, showIds;
  beforeEach(() => {
    store = mockStore({
      list: {
        list: null,
        ids: [], // list of id
        lists: [], // get one list full info
        loading: true,
        error: {},
        modal: false,
        edit: false,
        backdrop: true,
        tasks: [],
      },
    });
    store.dispatch = jest.fn();
    component = renderer.create(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );
    const id = '12121212';
    showIds = renderer.create(
      <Provider store={store}>
        <ShowId listid={id} />
      </Provider>
    );
  });
  it('Render Dashboard component', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
  it('Render get random button', () => {
    renderer.act(() => {
      component.root.findAllByType('button')[1].props.onClick();
    });
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalled(); // anomynous func
  });
  it('Render show Id', () => {
    expect(showIds.toJSON()).toMatchSnapshot();
  });
});
