import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { STATUS } from '../../constants/status';


/**
 * Displays a error message
 */
function DisplayError({
  status,
}): JSX.Element {
  if (status === STATUS.ERROR) {
    return (
      <MessageBar
        messageBarType={MessageBarType.error}
        isMultiline={false}
      >Sorry, somthing went wrong.</MessageBar>
    );
  }
  return null;
}

export default DisplayError;
