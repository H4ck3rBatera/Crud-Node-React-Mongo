import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import userIndex from "./pages/client/user";
import userCreate from "./pages/client/user/create";
import userUpdate from "./pages/client/user/update";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/user" exact component={userIndex} />
        <Route path="/user/create" exact component={userCreate} />
        <Route path="/user/update/:id" exact component={userUpdate} />
      </Switch>
    </BrowserRouter>
  );
}
