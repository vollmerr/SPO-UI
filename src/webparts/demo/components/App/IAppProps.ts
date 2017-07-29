import { RootState } from '../../state';
import { Store } from 'redux';
import { SPHttpClient } from '@microsoft/sp-http';

export interface IDemoProps {
  description: string;
  spHttpClient: SPHttpClient;
  currentWebUrl: string;
}
