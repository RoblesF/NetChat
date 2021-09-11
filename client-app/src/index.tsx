import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Route, Router, Switch } from 'react-router-dom';
import { SignIn } from './components/Auth/SignIn';
import { SignUp } from './components/Auth/SignUp';
import { NotFound } from './components/NotFound';
import { createBrowserHistory } from 'history';
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer } from 'react-toastify';

export const History = createBrowserHistory()

ReactDOM.render(
    <React.Fragment>
        <ToastContainer position="bottom-right" />
        <Router history={History}>
            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/signin" component={SignIn} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact component={NotFound} />
            </Switch>
        </Router>
    </React.Fragment>,
    document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
