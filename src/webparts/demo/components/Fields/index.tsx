import * as React from 'react';
import * as ReactDOM from 'react-dom';

import FieldText from '../FieldText';
import FieldSelect from '../FieldSelect';
import FieldCheckbox from '../FieldCheckbox';
import FieldDate from '../FieldDate';

const OPTIONS = [
  { key: 'EMPTY', text: '' },
  { key: 'A', text: 'Arial Black' },
  { key: 'B', text: 'Time New Roman' },
  { key: 'C', text: 'Comic Sans MS' },
];

// import {
//   Checkbox
// } from 'office-ui-fabric-react/lib/Checkbox';

// import {
//   ComboBox,
//   IComboBoxOption,
// } from 'office-ui-fabric-react/lib/ComboBox';

function Fields(): JSX.Element {

  return (
    <div>

      <FieldDate
        name={'Date'}
        label={'Default Date'}
      />

      <FieldDate
        required
        name={'rDate'}
        label={'Required Date'}
      />

      <FieldDate
        disabled
        name={'dDate'}
        label={'Disabled Date'}
      />

      <FieldDate
        required
        disabled
        name={'rdDate'}
        label={'Required + Disabled Date'}
      />

      <hr />

      <FieldText
        name={'Title'}
        label={'Title'}
      />

      <FieldText
        name={'firstName'}
        label={'First Name'}
      />

      <FieldText
        name={'lastName'}
        label={'Last Name'}
      />

      <FieldText
        required
        name={'testRequired'}
        label={'Required Text'}
      />

      <FieldText
        disabled
        name={'testDisabled'}
        label={'Disabled Text'}
      />

      <FieldText
        required
        disabled
        name={'testRequiredDisabled'}
        label={'Required + Disabled Text'}
      />

      <hr />

       <FieldSelect
        name={'Select'}
        label={'Default Select'}
        options={OPTIONS}
      />

      <FieldSelect
        required
        name={'rSelect'}
        label={'Required Select'}
        options={OPTIONS}
      />

      <FieldSelect
        disabled
        name={'dSelect'}
        label={'Disabled Select'}
        options={OPTIONS}
      />

      <FieldSelect
        required
        disabled
        name={'rdSelect'}
        label={'Required + Disabled Select'}
        options={OPTIONS}
      />

      {/* <hr />

      <FieldCheckbox
        name={'Checkbox'}
        label={'Default Checkbox'}
      />

      <FieldCheckbox
        required
        name={'rCheckbox'}
        label={'Required Checkbox'}
      />

      <FieldCheckbox
        disabled
        name={'dCheckbox'}
        label={'Disabled Checkbox'}
      />

      <FieldCheckbox
        required
        disabled
        name={'rdCheckbox'}
        label={'Required + Disabled Checkbox'}
      /> */}

    </div>
  );
}

export default Fields;




// import * as React from 'react';
// import {
//   Checkbox
// } from 'office-ui-fabric-react/lib/Checkbox';

// export interface ICheckboxBasicExampleState {
//   isChecked: boolean;
// }

// export class CheckboxBasicExample extends React.Component<{}, ICheckboxBasicExampleState> {
//   constructor() {
//     super();

//     this.state = {
//       isChecked: false
//     };

//     this._onCheckboxChange = this._onCheckboxChange.bind(this);
//   }

//   public render() {
//     let { isChecked } = this.state;

//     let styles: any = {
//       root: {
//         marginTop: '10'
//       }
//     };

//     return (
//       <div>
//         <Checkbox
//           label='Uncontrolled checkbox'
//           onChange={ this._onCheckboxChange }
//           inputProps={ {
//             onFocus: () => { console.log('Uncontrolled checkbox is focused'); },
//             onBlur: () => { console.log('Uncontrolled checkbox is blured'); }
//           } }
//           styles={ styles }
//         />

//         <Checkbox
//           label='Uncontrolled checkbox with defaultChecked true'
//           defaultChecked={ true }
//           onChange={ this._onCheckboxChange }
//           styles={ styles }
//         />

//         <Checkbox
//           label='Disabled uncontrolled checkbox with defaultChecked true'
//           disabled={ true }
//           defaultChecked={ true }
//           onChange={ this._onCheckboxChange }
//           styles={ styles }
//         />

//         <Checkbox
//           label='Controlled checkbox'
//           checked={ isChecked }
//           onChange={ (ev, checked) => {
//             this.setState({ isChecked: checked });
//           } }
//           styles={ styles }
//         />

//         <Checkbox
//           label='Checkbox rendered with boxSide "end"'
//           boxSide='end'
//           styles={ styles }
//         />
//       </div>
//     );
//   }

//   private _onCheckboxChange(ev: React.FormEvent<HTMLElement>, isChecked: boolean) {
//     console.log(`The option has been changed to ${isChecked}.`);
//   }

// }
