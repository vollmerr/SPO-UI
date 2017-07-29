declare interface IDemoStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'demoStrings' {
  const strings: IDemoStrings;
  export = strings;
}

declare interface IListItems {
  Id?: number;
  Title?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  testRequired?: string;
}
