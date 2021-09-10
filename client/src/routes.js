import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import userCreate from "./pages/user/create";
import userDelete from "./pages/user/delete";
import userDetails from "./pages/user/details";
import userIndex from "./pages/user";
import userUpdate from "./pages/user/update";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/user/create" exact component={userCreate} />
        <Route path="/user/delete/:id" exact component={userDelete} />
        <Route path="/user/details/:id" exact component={userDetails} />
        <Route path="/user" exact component={userIndex} />
        <Route path="/user/update/:id" exact component={userUpdate} />
      </Switch>
    </BrowserRouter>
  );
}