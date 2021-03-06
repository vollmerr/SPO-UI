import * as Immutable from 'immutable';

export interface IListState {
  title: string;
  lists: IListItems[];
}

export const initialState: IListState = {
  title: '',
  lists: []
};

//Immutable State.
export class ListState extends Immutable.Record(initialState) implements IListState {

  // Getters
  public readonly title: string;
  public readonly lists: IListItems[];

  // Setters
  public setTitle(newTitle: string): ListState {
    return this.set('title', newTitle) as ListState;
  }

  public addList(item: string): ListState {
    return this.update('lists', (lists: string[]) => {
      return lists.concat(item);
    }) as ListState;
  }

  public setLists(items: IListItems[]): ListState {
    return this.set('lists', items) as ListState;
  }
}
