import React from "react";
import { Route } from "react-router";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Counter from "./components/Counter";
import FetchData from "./components/FetchData";
import LoginPage from "./components/auth/login/LoginPage";
import UsersListFetchData from "./components/UsersListFetchData";
import UserListPage from "./components/auth/userlist/UserListPage";

export default () => (
  <Layout>
    <Route exact path="/" component={Home} />
    <Route path="/counter" component={Counter} />
    <Route path="/fetchdata/:startDateIndex?" component={FetchData} />
    <Route path="/login" component={LoginPage} />
    <Route path="/users" component={UserListPage} />
  </Layout>
);
