import React, { Component } from 'react';
import get from 'lodash.get';

import ReactQuill from 'react-quill';
import { Form, Input, Button } from 'antd';

import { isAllFieldsValid, isValid, getValidationErrorMessage } from '../../../helpers/validationHelper';

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

    isFieldValid = (path) => {
        const validationModel = get(contract, `${path}.validation`);
        const value = get(this.props, get(contract, `${path}.path`));
        if (value !== null) {
            return isValid(validationModel, value);
        }
        return true;
    }

    getErrorMessage = (path) => {
        const validationModel = get(contract, `${path}.validation`);
        const value = get(this.props, get(contract, `${path}.path`));
        if (value !== null) {
            return getValidationErrorMessage(validationModel, value);
        }
        return '';
    }

    render() {
        const { onChange } = this.props;
        return (
            <div>
                <Form className="post-form-container">
                    <Form.Item
                        validateStatus={`${!this.isFieldValid('post.name') ? 'error' : ''}`}
                        help={this.getErrorMessage('post.name')}
                        required={true}
                        label="Name">
                        <Input id="post-name" onChange={e => { onChange(contract.post.name.path, e.target.value) }} />
                    </Form.Item>
                    <Form.Item
                        validateStatus={`${!this.isFieldValid('post.shortDescription') ? 'error' : ''}`}
                        help={this.getErrorMessage('post.shortDescription')}
                        required={true}
                        label="Short Description">
                        <Input.TextArea id="post-short-description" onChange={e => { onChange(contract.post.shortDescription.path, e.target.value) }} />
                    </Form.Item>
                    <Form.Item
                        label="Description">
                        <ReactQuill id="post-description"
                            onChange={value => { onChange(contract.post.description.path, value) }} />
                    </Form.Item>
                    <Form.Item>
                        <Button disabled={!this.props.isValid} type="primary" className="action-button">
                            Post
                    </Button>
                    </Form.Item>
                </Form>
            </div >
        )
    }
}

export default PostForm;