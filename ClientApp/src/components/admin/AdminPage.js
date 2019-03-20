import React, { Component } from 'react';
import { Glyphicon, Nav, Navbar, NavItem, Row, Col,Tabs,Sonnet,Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
import CategoryPage from './category/CategoryPage';

class AdminPage extends Component {
    render() {
        return (
            <Tabs defaultActiveKey="categories" id="uncontrolled-tab-example">
                <Tab eventKey="categories" title="Categories">
                    <CategoryPage />
                </Tab>
                <Tab eventKey="*" title="Tags" disabled>
                   
                </Tab>
                <Tab eventKey="*" title="Posts" disabled>
                    
                </Tab>
            </Tabs>
            // <Row>
            //     <Col md={4} mdOffset={4}>
            //         <AdminForm />
            //     </Col>
            // </Row>
        );
    }
}
export default AdminPage;