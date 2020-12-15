import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// react redux
import { Provider } from 'react-redux';
import store from './store';
import { Fragment } from 'react';
// components
import Landing from './components/layout/Landing';
import Alert from './components/layout/Alert';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/note" component={Dashboard} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
