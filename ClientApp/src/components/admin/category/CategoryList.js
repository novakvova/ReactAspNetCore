import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EditCategory from "./EditCategory";
import { requestCategories } from "../../../actions/categoriesActions";
import PropTypes from 'prop-types';

class CategoryList extends Component {
    constructor(props) {
        super(props)

        this.handlerEdited = this.handlerEdited.bind(this)
    }

    handlerEdited() {
        this.setState({
            needToEdit: -1
        })
    }

    state = {
        needToEdit: -1
    }
    componentWillMount() {
        // This method runs when the component is first added to the page
        this.props.requestCategories();
    }

    renderContext() {
        return (
            <div>
                <p></p>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th >Name</th>
                            <th colSpan="2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.categories.map(ct =>
                            <tr key={ct.id}>
                                <td className="col-sm-1">
                                    {ct.id}
                                </td>
                                <td className="col-md-6">
                                    {this.state.needToEdit === ct.id ? <EditCategory category={ct} handlerEdited={this.handlerEdited}></EditCategory> : ct.name}
                                </td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => this.setState({ needToEdit: ct.id })}>Edit</button>&nbsp;
                                {/* </td>
                                <td> */}
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


CategoryList.propTypes =
    {
        requestCategories: PropTypes.func.isRequired
    }

const mapStateToProps = (state) => {
    return {
        categories: state.categories.categories
    };
}

export default connect(mapStateToProps, { requestCategories })(CategoryList);
