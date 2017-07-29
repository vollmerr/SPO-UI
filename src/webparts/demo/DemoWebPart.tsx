import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'demoStrings';
import App from './components/App';
import { IDemoWebPartProps } from './IDemoWebPartProps';

import configureStore from './store/configureStore';
import { Provider } from 'react-redux';

const store = configureStore();

export default class DemoWebPart extends BaseClientSideWebPart<IDemoWebPartProps> {

  public render(): void {

    // const provider: React.ReactElement<Provider> = React.createElement(typeof Provider, null, React.createElement(
    //   App,
    //   {
    //     store,
    //     description: this.properties.description,
    //     spHttpClient: this.context.spHttpClient,
    //     currentWebUrl: this.context.pageContext.web.serverRelativeUrl,
    //   }));

    // ReactDom.render(provider, this.domElement);

    const appProps = {
      description: this.properties.description,
      spHttpClient: this.context.spHttpClient,
      currentWebUrl: this.context.pageContext.web.serverRelativeUrl,
    };

    ReactDom.render(
      <Provider store={store}>
        <App {...appProps} />
      </Provider>,
      this.domElement,
    );


    // const provider: React.ReactElement<any> = React.createElement(
    //   App,
    //   {
    //     store,
    //     description: this.properties.description,
    //     spHttpClient: this.context.spHttpClient,
    //     currentWebUrl: this.context.pageContext.web.serverRelativeUrl,
    //   });

    // ReactDom.render(provider, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
