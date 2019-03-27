import React, { Component } from 'react';
import CategoryList from './CategoryList';
import AddCategory from './AddCategory';
import { Col, Row } from 'react-bootstrap';

class CategoryPage extends Component {

    render() {
        return (
            <Row>
                <Col md={8} mdOffset={2}>
                    <AddCategory></AddCategory>
                    <CategoryList></CategoryList>
                </Col>
            </Row>
        );
    }
}

export default CategoryPage;