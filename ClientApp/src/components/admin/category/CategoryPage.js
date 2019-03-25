import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../../store/Categories';
import { Col, Row } from 'react-bootstrap';
import CategoryList from './CategoryList';
import AddCategory from './AddCategory';

class CategoryPage extends Component {

    render() {
        return (
            <div>
                <AddCategory></AddCategory>
                <CategoryList></CategoryList>
            </div>
        );
    }
}

export default CategoryPage;