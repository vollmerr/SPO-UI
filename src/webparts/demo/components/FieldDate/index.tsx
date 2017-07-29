import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Field } from 'redux-form';

import {
  DatePicker,
  DayOfWeek,
  IDatePickerStrings
} from 'office-ui-fabric-react/lib/DatePicker';

// TODO: MOVE COMMON
export const isEmptyText = value => (
  (typeof value !== 'string') ||
    value.match(/^\s*$/)
    ? 'Required'
    : undefined
);

const dayPickerStrings: IDatePickerStrings = {
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],

  shortMonths: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ],

  days: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ],

  shortDays: [
    'S',
    'M',
    'T',
    'W',
    'T',
    'F',
    'S'
  ],

  goToToday: 'Go to today',
  prevMonthAriaLabel: 'Go to previous month',
  nextMonthAriaLabel: 'Go to next month',
  prevYearAriaLabel: 'Go to previous year',
  nextYearAriaLabel: 'Go to next year',

  isRequiredErrorMessage: 'Required',

  invalidInputErrorMessage: 'Invalid date format.',
};


/**
 * Date input for redux-form Field
 * Wraps office-ui's DatePicker
 *
 * https://dev.office.com/fabric#/components/datepicker
 * https://github.com/OfficeDev/office-ui-fabric-react/blob/master/packages/office-ui-fabric-react/src/components/DatePicker/DatePicker.tsx
 */
function InputDate(props: InputDateProps): JSX.Element {
  const {
    input,
    meta,
    label,
    disabled,
    required,
  } = props;

  const { name, onChange, onBlur, onFocus } = input;
  const { touched, error } = meta;
  const errorMessage = touched && error ? error : null;
  const isRequired = required && !disabled;

  const handleChange = (date) => {
    onChange(date);
    onFocus();
  };

  const datePickerProps = {
    name,
    label,
    disabled,
    isRequired,
    strings: dayPickerStrings,
    onSelectDate: handleChange,
  };

  return (
    <DatePicker {...datePickerProps} />
  );
}

interface InputDateProps {
  input: any;
  meta: any;
  label: string;
  disabled?: boolean;
  required?: boolean;
}


/**
 * Date Field for redux-form
 * Wraps redux-form's Field
 *
 * http://redux-form.com/7.0.3/docs/api/Field.md/
 */
function FieldDate(props: FieldDateProps): JSX.Element {
  const { required, disabled } = props;

  let toValidate = undefined;
  if (required && !disabled) {
    toValidate = [];
  }

  return (
    <Field component={InputDate} validate={toValidate} {...props} />
  );
}

interface FieldDateProps {
  name: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
  validate?: ((val: string) => boolean | undefined)[];
}


export default FieldDate;
