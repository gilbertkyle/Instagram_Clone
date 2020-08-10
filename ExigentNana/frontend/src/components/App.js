import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "../store";
import Header from "./layout/Header";
import Alerts from "./layout/Alerts";
import { HashRouter as Router, Link, Switch, Route } from "react-router-dom";
import Login from "./accounts/Login";
import PostForm from "./posts/PostForm";
import Footer from "./layout/Footer";
import PostFeed from "./posts/PostFeed";
import { Container } from "@material-ui/core";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { loadUser } from "../actions/auth";

import Register from "./accounts/Register";

const alertOptions = {
  timeout: 3000,
  position: "top center"
};

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Header />
            <Alerts />
            <Container maxWidth="md">
              <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={() => <Register />} />
                <Route exact path="/post" component={PostForm} />
                <Route path="" component={PostFeed} />
              </Switch>
              <Footer />
            </Container>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
