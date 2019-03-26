import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../../store/Categories';
import { Link } from "react-router-dom";

class CategoryList extends Component {

    componentWillMount() {
        // This method runs when the component is first added to the page
        this.props.requestCategories();
    }

    renderContext() {
        return (
            <div>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th colSpan="2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.categories.map(ct =>
                            <tr key={ct.id}>
                                <td>
                                    {ct.id}
                                </td>
                                <td>
                                    {ct.name}
                                </td>
                                <td>
                                    <Link to={`/categories/${ct.id}`} className="btn btn-primary">Edit</Link>
                                </td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => this.props.deleteCategory(ct.id)}>Delete</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }

    render() {
        return (
            this.props.isLoading ? <span>Loading...</span> : this.renderContext()
        );
    }
}

export default connect(
    state => state.categories,
    dispatch => bindActionCreators(actionCreators, dispatch))
    (CategoryList);