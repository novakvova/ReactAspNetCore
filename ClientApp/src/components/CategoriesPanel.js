import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { requestCategories } from "../actions/categoriesActions";
import PropTypes from 'prop-types';

class CategoriesPanel extends Component {
    componentWillMount() {
        // This method runs when the component is first added to the page
        this.props.requestCategories();
    }

    renderContext() {
        return (
            <div className="card">
                <h2>Categories</h2>
                <div>
                    <div>
                        {this.props.categories.map(ct =>

                            <Link to='/' className="list-group-item" key={ct.id}>{ct.name}<span className="float-right badge badge-light round">{ct.id}</span></Link>
                        )}
                    </div>
                </div>
            </div>
        );
    }
    render() {
        return (
            this.props.isLoading ? <span>Loading...</span> : this.renderContext()
        );
    }
}

CategoriesPanel.propTypes =
    {
        requestCategories: PropTypes.func.isRequired
    }

const mapStateToProps = (state) => {
    return {
        categories: state.categories.categories
    };
}

export default connect(mapStateToProps, { requestCategories })(CategoriesPanel);
