export interface IPost {
    userId: string;
    id: string;
    title: String;
    body: string;
}

export interface IDetailsListBasicExampleItem {
    key: number;
    name: string;
    value: number;
  }
  

  export interface IDetailsListBasicExampleState {
    items: IDetailsListBasicExampleItem[];
    selectionDetails: string;
  }