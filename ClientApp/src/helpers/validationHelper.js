import { isString } from 'lodash';

export const isValid = (validationModel, value) => {
    if (!validationModel) {
        return true;
    }

    if (validationModel.required && !isRequiredValid(value)) {
        return false;
    }

    return true;
}

export const getValidationErrorMessage = (validationModel, value) => {
    if (!validationModel) {
        return "";
    }
    
    if (validationModel.required && !isRequiredValid(value)) {
        return "Field can't be empty";
    }

    return "";
}

export const isAllFieldsValid = (fieldsWithValidationModels) => {
    const validationResults = fieldsWithValidationModels.map((item) => {
        return isValid(item.validationModel, item.value);
    });

    return validationResults.filter(item => item === false).length === 0;
}

export const isRequiredValid = (value) => {
    if (isString(value)) {
        return value.trim() ? true : false;
    }

    return value ? true : false;
}
