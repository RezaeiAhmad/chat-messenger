import React from "react";

import { Switch, Route } from "react-router-dom";

import AuthContextProvider from "../Contexts/AuthContext";

import Chats from "./Chats";
import Login from "./Login";

const App = () => {
  return (
    <div>
      <AuthContextProvider>
        <Switch>
          <Route path="/chats" component={Chats} />
          <Route path="/" component={Login} />
        </Switch>
      </AuthContextProvider>
    </div>
  );
};

export default App;
