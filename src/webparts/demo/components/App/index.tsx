import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
// import { escape } from '@microsoft/sp-lodash-subset';

import { IDemoProps } from './IAppProps';
// import { updateTitle, addList, getLists } from '../../actions/listActions';
import * as listActions from '../../actions/listActions';
import { RootState } from '../../state';

import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { PrimaryButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { STATUS } from '../../constants/status';

import DisplayError from '../DisplayError';
import DisplayLoading from '../DisplayLoading';
import Fields from '../Fields';

// TODO...
interface IConnectedDispatch {
  actions: any;
  // updateTitle: (title: string) => void;
  // getLists: (spHttpClient: SPHttpClient, currentWebUrl: string, title: string) => Promise<any>;
  // addList: (spHttpClient: SPHttpClient, currentWebUrl: string, title: string) => void;
}

interface IConnectedState {
  title: string; // TODO: REMOVE
  initialValues: IListItems;
  formValues: IListItems;
}

function mapStateToProps(state: RootState, ownProps: IDemoProps): IConnectedState {
  return {
    title: state.lists.title, // TODO: REMOVE?
    initialValues: state.lists.lists[0],
    formValues: getFormValues('test-form')(state) as IListItems,
  };
}

// const mapDispatchToProps = (dispatch: Dispatch<RootState>): IConnectedDispatch => ({
//   updateTitle: (title: string) => {
//     dispatch(updateTitle(title));
//   },
//   getLists: (spHttpClient: SPHttpClient, currentWebUrl: string, title: string): Promise<any> => (
//     dispatch(getLists(spHttpClient, currentWebUrl, title))
//   ),
//   addList: (spHttpClient: SPHttpClient, currentWebUrl: string, title: string) => {
//     dispatch(addList(spHttpClient, currentWebUrl, title));
//   },
// });

const mapDispatchToProps = (dispatch: Dispatch<RootState>): IConnectedDispatch => ({
  actions: bindActionCreators({
    ...listActions,
  }, dispatch),
});

const reduxFormProps = {
  form: 'test-form',
};


interface IAppState {
  listTitle?: string;
  listItemEntityTypeName?: string;
  etag?: string;
  status?: number;
}

@(connect(mapStateToProps, mapDispatchToProps) as any)
@(reduxForm(reduxFormProps))
class App extends React.Component<any, IAppState> {
  constructor(props) {
    super(props);
    this.state = {
      listTitle: 'testList',
      listItemEntityTypeName: null,
      etag: null,
      status: STATUS.LOADING,
    };
  }

  public componentDidMount() {
    const { actions, spHttpClient, currentWebUrl } = this.props;
    const { listTitle } = this.state;

    actions.getLists(spHttpClient, currentWebUrl, listTitle)
      .then(this.getListItemEntityTypeName)
      .then(() => this.setState({
        status: STATUS.READY,
      }));
  }


  public handleSubmit = (vals: IListItems) => {
    console.log("handling submit...", vals)
    this.setState({
      status: STATUS.SUBMITTING
    });

    this.getListItemEntityTypeName()
      .then(this.getEtag)
      .then(this.handleUpdate)
      .catch(error => this.setState({ status: STATUS.ERROR }));
  }


  public handleUpdate = (): Promise<any> => {
    return new Promise<any>((resolve, reject): void => {
      const { spHttpClient, currentWebUrl, formValues } = this.props;
      const { listTitle, listItemEntityTypeName, etag } = this.state;
      const url = `${currentWebUrl}/_api/web/lists/getbytitle('${listTitle}')/items(${formValues.Id})`;

      const fields = [
        'Id',
        'Title',
        'firstName',
        'lastName',
        'phoneNumber',
        'testRequired',
      ];
      const filteredList = {};
      fields.forEach(field => filteredList[field] = formValues[field]);

      const body: string = JSON.stringify({
        __metadata: {
          type: listItemEntityTypeName,
        },
        ...filteredList,
      });

      const config = {
        body,
        headers: {
          Accept: 'application/json;odata=nometadata',
          'Content-type': 'application/json;odata=verbose',
          'odata-version': '',
          'IF-MATCH': etag,
          'X-HTTP-Method': 'MERGE',
        },
      };

      spHttpClient.post(url, SPHttpClient.configurations.v1, config)
        .then(() => resolve(this.setState({ status: STATUS.READY })))
        .catch(error => reject(error));
    });
  }


  public getEtag = (): Promise<any> => {
    return new Promise<any>((resolve, reject): void => {
      const { spHttpClient, currentWebUrl, formValues } = this.props;
      const { listTitle } = this.state;
      const url = `${currentWebUrl}/_api/web/lists/getbytitle('${listTitle}')/items(${formValues.Id})?$select=Id`;
      const config = {
        headers: {
          Accept: 'application/json;odata=nometadata',
          'odata-version': '',
        },
      };

      spHttpClient.get(url, SPHttpClient.configurations.v1, config)
        .then((response: SPHttpClientResponse) => {
          this.setState({
            etag: response.headers.get('ETag'),
          });
          resolve();
        })
        .catch(error => reject(error));
    });
  }


  public getListItemEntityTypeName = (): Promise<any> => {
    return new Promise<any>((resolve, reject): void => {
      const { spHttpClient, currentWebUrl } = this.props;
      const { listTitle, listItemEntityTypeName } = this.state;
      const url = `${currentWebUrl}/_api/web/lists/getbytitle('${listTitle}')?$select=ListItemEntityTypeFullName`;
      const config = {
        headers: {
          Accept: 'application/json;odata=nometadata',
          'odata-version': '',
        }
      };

      if (listItemEntityTypeName) {
        return resolve();
      }

      spHttpClient.get(url, SPHttpClient.configurations.v1, config)
        .then((response: SPHttpClientResponse): Promise<any> => {
          this.setState({
            etag: response.headers.get('ETag')
          });

          return response.json();
        })
        .then((response): void => {
          this.setState({
            listItemEntityTypeName: response.ListItemEntityTypeFullName
          });

          return resolve();
        })
        .catch(error => reject(error));
    });
  }


  public render() {
    const { submitting, invalid, dirty, handleSubmit } = this.props;
    const { status } = this.state;

    const disableSubmit = submitting ||
      status === STATUS.ERROR ||
      status === STATUS.LOADING;

    return (
      <Fabric>

        <h1>Test Form</h1>

        <DisplayError status={status} />

        <DisplayLoading status={status} />
        <form onSubmit={handleSubmit(this.handleSubmit)} noValidate>
          <Fields/>

          <PrimaryButton
            text={'Submit'}
            type={'submit'}
            disabled={disableSubmit}
          />
        </form>

      </Fabric>
    );
  }
}

export default App;
