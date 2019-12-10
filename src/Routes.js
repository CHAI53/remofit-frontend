import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "./Views/Signup";
import Login from "./Views/Login";
import Shop from "./Views/Shop";
import ShopDetail from "./Views/ShopDetail";
import test from "./Views/test";

export class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/" component={Login} />
          <Route exact path="/shop" component={Shop} />
          <Route exact path="/shopdetail" component={ShopDetail} />
          <Route exact path="/test" component={test} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
