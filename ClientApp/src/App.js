import React from "react";
import { Route } from "react-router";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Counter from "./components/Counter";
import FetchData from "./components/FetchData";
import LoginPage from "./components/auth/login/LoginPage";
import TagsPage from "./components/tag/TagsPage";
import RegisterPage from './components/auth/register/RegisterPage';
import UserListPage from "./components/auth/userlist/UserListPage";
import MicroblogWidget from "./components/microblog";

export default () => (
  <Layout>
    <Route exact path="/" component={Home} />
    <Route path="/counter" component={Counter} />
    <Route path="/fetchdata/:startDateIndex?" component={FetchData} />
    <Route path="/login" component={LoginPage} />
    <Route path="/tags" component={TagsPage} />
    <Route path='/register' component={RegisterPage} />
    <Route path="/users" component={UserListPage} />
    <Route path="/microblog" component={MicroblogWidget} />
  </Layout>
);
