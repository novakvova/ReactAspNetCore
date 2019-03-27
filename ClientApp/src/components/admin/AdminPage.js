import React, { Component } from 'react';
import { Nav, Tab, Row, NavItem } from "react-bootstrap";
import CategoryPage from './category/CategoryPage';
import TagsPage from '../tag/TagsPage'
import UserListPage from '../auth/userlist/UserListPage'

import "./AdminSideBar.css";

class AdminPage extends Component {

    render() {
        return (
            <Tab.Container id="admin-page" defaultActiveKey="categories">
                <Row>
                    <Nav variant="pills" className="admin-sidebar">
                        <NavItem eventKey="categories">
                            Categories
                            </NavItem>
                        <NavItem eventKey="tags">
                            Tags
                            </NavItem>
                            <NavItem eventKey="users">
                            Users
                            </NavItem>
                    </Nav >
                    <Tab.Content className="admin-content container">
                        <Tab.Pane eventKey="categories">
                            <CategoryPage />
                        </Tab.Pane>
                        <Tab.Pane eventKey="tags">
                            <TagsPage></TagsPage>
                        </Tab.Pane>
                        <Tab.Pane eventKey="users">
                            <UserListPage></UserListPage>
                        </Tab.Pane>
                    </Tab.Content>
                </Row>
            </Tab.Container>
        );
    }
}
  
  export default AdminPage;