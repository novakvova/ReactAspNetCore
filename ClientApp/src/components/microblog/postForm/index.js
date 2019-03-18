import React, { Component } from 'react';

import ReactQuill from 'react-quill';
import { Form, Input } from 'antd';

import './index.css';

class PostForm extends Component {
    constructor(props) {
        super(props)
        this.state = { text: '' } // You can also pass a Quill Delta here
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(value) {
        this.setState({ text: value })
    }

    render() {
        return (
            <div>
                <Form className="post-form-container">
                    <Form.Item required={true} label="Name">
                        <Input />
                    </Form.Item>
                    <Form.Item required={true} label="Short Description">
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item required={true} label="Description">
                        <ReactQuill value={this.state.text}
                            onChange={this.handleChange} />
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default PostForm;