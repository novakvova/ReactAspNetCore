import React, { Component } from 'react';
import get from 'lodash.get';

import { Form, Button } from 'antd';
import CommonForm from '../../common/form';

import { isAllFieldsValid } from '../../../helpers/validationHelper';

import { contract } from '../constants';

import './index.css';

class PostForm extends Component {
    componentDidUpdate() {
        this.isFormValid();
    }

    isFormValid = () => {
        const validationModelds = [
            {
                validationModel: contract.post.name.validation,
                value: get(this.props, contract.post.name.path)
            },
            {
                validationModel: contract.post.shortDescription.validation,
                value: get(this.props, contract.post.shortDescription.path)
            }
        ];

        if (isAllFieldsValid(validationModelds)) {
            if (!this.props.isValid) {
                this.props.onChange('post.isValid', true);
            }
        } else if (this.props.isValid) {
            this.props.onChange('post.isValid', false);
        }
    }

    onPostClick = () => {
        this.props.createNewPost({ email: this.props.email, ...this.props.post.form });
    }

    render() {
        const { onChange, isLoading, isError } = this.props;
        return (
            <div>
                <Form className="post-form-container">
                    <CommonForm.Input
                        id="post-name"
                        label="Name"
                        value={get(this.props, contract.post.name.path)}
                        path={contract.post.name.path}
                        disabled={this.props.isLoading}
                        validation={contract.post.name.validation}
                        onChange={onChange}>
                    </CommonForm.Input>
                    <CommonForm.TextArea
                        id="post-short-description"
                        label="Short Description"
                        value={get(this.props, contract.post.shortDescription.path)}
                        path={contract.post.shortDescription.path}
                        disabled={this.props.isLoading}
                        validation={contract.post.shortDescription.validation}
                        required={true}
                        onChange={onChange}>
                    </CommonForm.TextArea>
                    <CommonForm.Quil
                        id="post-description"
                        label="Description"
                        value={get(this.props, contract.post.description.path)}
                        path={contract.post.description.path}
                        disabled={this.props.isLoading}
                        validation={contract.post.description.validation}
                        required={true}
                        onChange={onChange}>
                    </CommonForm.Quil>
                    <Form.Item>
                        <Button loading={isLoading} disabled={!this.props.isValid || this.props.isLoading} type="primary" className="action-button" onClick={this.onPostClick}>
                            Post
                    </Button>
                    </Form.Item>
                </Form>
            </div >
        )
    }
}

export default PostForm;