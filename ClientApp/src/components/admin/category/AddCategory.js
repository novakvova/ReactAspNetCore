import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { addCategory } from "../../../actions/categoriesActions";
import PropTypes from 'prop-types';

class AddCategory extends Component {
    state = {
        name: '',
        errors: {
        },
        done: false,
        isLoading: false
    }

    setStateByErrors = (name, value) => {
        if (!!this.state.errors[name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[name];
            this.setState(
                {
                    [name]: value,
                    errors
                }
            )
        }
        else {
            this.setState(
                { [name]: value })
        }
    }

    handleChange = (e) => {
        this.setStateByErrors(e.target.name, e.target.value);
    }

    onSubmitForm = (e) => {

        e.preventDefault();
        let errors = {};
        if (this.state.name === '') errors.name = "Cant't be empty!"

        const isValid = Object.keys(errors).length === 0
        if (isValid) {
            const { name } = this.state;
            this.setState({ isLoading: true });
            this.props.addCategory({ name: name})
                .then(
                    () => {this.setState({ done: true, isLoading: false });this.inputName.value=""},
                    (err) =>{this.setState({ errors: err.response.data, isLoading: false })}
                );
        }
        else {
            this.setState({ errors });
        }
    }
    render() {
        const { errors, isLoading } = this.state;
        return (
                <form onSubmit={this.onSubmitForm}>
                {!!errors.invalid ?
                    <div className="alert alert-danger">
                        {errors.invalid}.
                    </div> : ''}
                <div className={classnames('form-group', { 'has-error': !!errors.name })}>
                    <label htmlFor="email">Category name:</label>
                    <input type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                        ref={input => this.inputName = input} />
                    {!!errors.name ? <span className="help-block">{errors.name}</span> : ''}
                </div>
                <div className="form-group">
                    <button className="btn btn-success mb-2" disabled={isLoading}>Add</button>
                    </div>
                </form>
        );
    }
}


AddCategory.propTypes =
    {
        addCategory: PropTypes.func.isRequired
    }

export default connect(null, { addCategory })(AddCategory);
