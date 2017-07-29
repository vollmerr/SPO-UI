import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Field } from 'redux-form';

import { TextField } from 'office-ui-fabric-react/lib/TextField';

// TODO: MOVE COMMON
export const isEmptyText = value => (
  (typeof value !== 'string') ||
    value.match(/^\s*$/)
    ? 'Required'
    : undefined
);


/**
 * Text input for redux-form Field
 * Wraps office-ui's TextField
 *
 * https://dev.office.com/fabric#/components/textfield
 * https://github.com/OfficeDev/office-ui-fabric-react/blob/master/packages/office-ui-fabric-react/src/components/TextField/TextField.tsx
 */
function InputText(props: InputTextProps): JSX.Element {
  const {
    input,
    meta,
    label,
    disabled,
    required,
  } = props;

  const { onChange, onBlur, onFocus, name, value } = input;
  const { touched, error } = meta;

  const errorMessage = touched && error ? error : '';

  const isRequired = required && !disabled;

  const textFieldProps = {
    name,
    label,
    value,
    onBlur,
    onFocus,
    disabled,
    errorMessage,
    onChanged: onChange,
    required: isRequired,
    'aria-describedby': name,
    ...input,
  };

  return (
    <TextField {...textFieldProps} />
  );
}

interface InputTextProps {
  name: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
  input: any;
  meta: any;
}


/**
 * Text field for redux-form
 * Wraps redux-form's Field
 *
 * http://redux-form.com/7.0.3/docs/api/Field.md/
 */
function FieldText(props: FieldTextProps): JSX.Element {
  const { required, disabled } = props;

  let toValidate = undefined;
  if (required && !disabled) {
    toValidate = [isEmptyText];
  }

  return (
    <Field component={InputText} validate={toValidate} {...props} />
  );
}

interface FieldTextProps {
  name: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
  validate?: ((val: string) => boolean | undefined)[];
}


export default FieldText;
