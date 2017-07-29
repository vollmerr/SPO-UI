import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  Spinner,
  SpinnerSize
} from 'office-ui-fabric-react/lib/Spinner';
import { STATUS } from '../../constants/status';


/**
 * Displays a loading indicator
 */
function DisplayLoading({
  status,
}): JSX.Element {
  if (status === STATUS.LOADING) {
    return (
      <Spinner size={SpinnerSize.large} label={'Loading...'} />
    );
  } else if (status === STATUS.SUBMITTING) {
    return (
      <Spinner size={SpinnerSize.large} label={'Submitting...'} />
    );
  }
  return null;
}

export default DisplayLoading;
