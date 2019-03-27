import React, { Component } from 'react';

import { Form, Input as CustomInput } from 'antd';

import { isValid, getValidationErrorMessage } from '../../../helpers/validationHelper';

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validationEnabled: false
        }
    }

    getFieldValidationStatus = () => {
        const { validation, value } = this.props;
        if (this.state.validationEnabled) {
            return !isValid(validation, value) ? 'error' : '';
        }
        return '';
    }

    getErrorMessage = () => {
        const { validation, value } = this.props;
        if (this.state.validationEnabled) {
            return getValidationErrorMessage(validation, value);
        }
        return '';
    }

    onBlur = () => {
        this.setState({
            validationEnabled: true
        })
    }

    render() {
        const { id, label, path, disabled, validation, value, onChange } = this.props;
        return (
            <Form.Item label={label}
                validateStatus={this.getFieldValidationStatus()}
                help={this.getErrorMessage()}
                disabled={disabled}
                required={validation.required} >
                <div onBlur={this.onBlur}>
                    <CustomInput id={id}
                        value={value}
                        onChange={e => { onChange(path, e.target.value) }} />
                </div>
            </Form.Item>
        )
    }
}

export default Input;