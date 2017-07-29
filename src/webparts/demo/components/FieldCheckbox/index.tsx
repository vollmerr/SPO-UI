import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Field as ReduxField } from 'redux-form';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';

import { Label } from 'office-ui-fabric-react/lib/Label';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { DelayedRender, css } from 'office-ui-fabric-react/lib/Utilities';

import * as textStyles from 'office-ui-fabric-react/lib/components/TextField/TextField.scss';
import { AnimationClassNames } from '@uifabric/styling/lib/index';

export const isEmptyCheck = value => (
  (!!value && !value.length) || (typeof value !== 'object')
    ? 'Required'
    : undefined
);



interface Input {
  name: string;
  label?: string;
  options: Object[];
  disabled?: boolean;
  required?: boolean;
  input: any;
  meta: any;
}

// function Input({
//   input,
//   meta,
//   label,
//   disabled,
//   required,
// }) {
//   const { onChange, onBlur, onFocus, name, value } = input;
//   const { touched, error } = meta;

//   const errorMessage = touched && error ? error : '';

//   const isRequired = required && !disabled;

//   let styles = {
//       root: {
//         marginTop: '60'
//       }
//   };

//   const checkBoxProps = {
//     name,
//     label,
//     value,
//     disabled,
//     onChange,
//     ...input,
//   };

//   return (
//     <div>

//       {label && <Label required={isRequired}>{label}</Label>}

//        <Checkbox {...checkBoxProps} />

//       {/* https://github.com/OfficeDev/office-ui-fabric-react/blob/master/packages/office-ui-fabric-react/src/components/TextField/TextField.tsx */}
//       {errorMessage &&
//         <div aria-live={'assertive'}>
//           <DelayedRender>
//             <p
//               className={css('ms-TextField-errorMessage', AnimationClassNames.slideDownIn20, textStyles.errorMessage)}
//             >
//               {Icon({ iconName: 'Error', className: textStyles.errorIcon })}
//               <span data-automation-id={'error-message'}>{errorMessage}</span>
//             </p>
//           </DelayedRender>
//         </div>
//       }

//     </div>
//   );
// }


class Input extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      checkedFields: {
        first: false
      }
    };
  }

  render() {
    const { input, meta, required, disabled, label } = this.props;
    const { onChange, onBlur, onFocus, name, value } = input;
    const { touched, error } = meta;

    const errorMessage = touched && error ? error : '';

    const isRequired = required && !disabled;

    let styles = {
      root: {
        marginTop: '60'
      }
    };

    const checkBoxProps = {
      name,
      label,
      value,
      disabled,
      onChange,
      ...input,
    };

    return (
      <div>

        {label && <Label required={isRequired}>{label}</Label>}

        <Checkbox {...checkBoxProps} />

        {/* https://github.com/OfficeDev/office-ui-fabric-react/blob/master/packages/office-ui-fabric-react/src/components/TextField/TextField.tsx */}
        {errorMessage &&
          <div aria-live={'assertive'}>
            <DelayedRender>
              <p
                className={css('ms-TextField-errorMessage', AnimationClassNames.slideDownIn20, textStyles.errorMessage)}
              >
                {Icon({ iconName: 'Error', className: textStyles.errorIcon })}
                <span data-automation-id={'error-message'}>{errorMessage}</span>
              </p>
            </DelayedRender>
          </div>
        }

      </div>
    );
  }
}





interface FieldProps {
  name: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
  validate?: ((val: string) => boolean | undefined)[];
}

function FieldCheckbox(props: FieldProps): JSX.Element {
  const { required, disabled } = props;

  let toValidate = undefined;
  if (required && !disabled) {
    toValidate = [isEmptyCheck];
  }

  return (
    <ReduxField component={Input} type={'checkbox'} validate={toValidate} {...props} />
  );
}

export default FieldCheckbox;
