import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Field } from 'redux-form';

import {
  ComboBox,
  IComboBoxOption,
} from 'office-ui-fabric-react/lib/ComboBox';

// TODO: MOVE COMMON
export const isEmptyText = value => (
  (typeof value !== 'string') ||
    value.match(/^\s*$/)
    ? 'Required'
    : undefined
);


/**
 * Select input for redux-form Field
 * Wraps office-ui's ComboBox
 *
 * https://dev.office.com/fabric#/components/ComboBox
 * https://github.com/OfficeDev/office-ui-fabric-react/blob/master/packages/office-ui-fabric-react/src/components/Checkbox/Checkbox.tsx
 */
function InputSelect(props: InputSelectProps): JSX.Element {
  const {
    input,
    meta,
    label,
    options,
    disabled,
    required,
  } = props;

  const { name, onChange, onBlur } = input;
  const { touched, error } = meta;
  const errorMessage = touched && error ? error : null;
  const isRequired = required && !disabled;

  const handleChange = (option: IComboBoxOption) => {
    onChange(option.text);
    onBlur();
  }

  const checkBoxProps = {
    name,
    label,
    options,
    disabled,
    errorMessage,
    ariaLabel: label,
    autoComplete: 'on',
    allowFreeform: false,
    required: isRequired,
    onChanged: handleChange,
  };

  return (
    <ComboBox {...checkBoxProps} />
  );
}

interface InputSelectProps {
  input: any;
  meta: any;
  label: string;
  options: IComboBoxOption[];
  disabled?: boolean;
  required?: boolean;
}


/**
 * Select Field for redux-form
 * Wraps redux-form's Field
 *
 * http://redux-form.com/7.0.3/docs/api/Field.md/
 */
function FieldCheckbox(props: FieldCheckboxProps): JSX.Element {
  const { required, disabled } = props;

  let toValidate = undefined;
  if (required && !disabled) {
    toValidate = [isEmptyText];
  }

  return (
    <Field component={InputSelect} validate={toValidate} {...props} />
  );
}

interface FieldCheckboxProps {
  name: string;
  label: string;
  options: IComboBoxOption[];
  disabled?: boolean;
  required?: boolean;
  validate?: ((val: string) => boolean | undefined)[];
}


export default FieldCheckbox;
