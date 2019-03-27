import React from "react";
import { Route } from "react-router";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Counter from "./components/Counter";
import FetchData from "./components/FetchData";
import LoginPage from "./components/auth/login/LoginPage";
import TagsPage from "./components/tag/TagsPage";
import RegisterPage from './components/auth/register/RegisterPage';
import AdminPage from './components/admin/AdminPage';
import UserListPage from "./components/auth/userlist/UserListPage";
import MicroblogWidget from "./components/microblog";
import UserPage from "./components/userProfile/UserPage";
import ForgotPasswordPage from "./components/auth/ForgotPasswordPage";
import requireAuth from "./utils/requireAuth";

export default () => (
  <Layout>
    <Route exact path="/" component={Home} />
    {/* <Route path="/counter" component={Counter} /> */}
    {/* <Route path="/fetchdata/:startDateIndex?" component={FetchData} /> */}
    <Route path="/login" component={LoginPage} />
    {/* <Route path="/tags" component={TagsPage} /> */}
    <Route path='/register' component={RegisterPage} />
    <Route path='/admin' component={requireAuth(AdminPage,"Admin")} />
    {/* <Route path="/users" component={UserListPage} />  */}
    <Route path="/user" component={UserPage} />
    <Route path="/microblog" component={MicroblogWidget} />
    <Route path="/forgotpassword" component={ForgotPasswordPage} />
  </Layout>
);
