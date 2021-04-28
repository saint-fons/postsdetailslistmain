export interface IPost {
    userId: string;
    id: string;
    title: String;
    body: string;
}


export interface IAddress {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
}

export interface IUsers {
    id: string;
    name: string;
    username: String;
    email: string;
    address: IAddress;
}



export interface IDetailsListUserSelection {
    userId: string;
  }



  export interface IPickedUser {
    name: string;
    username: string;
    email: string;
  }