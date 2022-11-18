export interface UserModel {
  _id: string; //! ObjectID
  name: string;
  email: string;
  password: string;
  favoritesId?: string[]; //! ObjectId
  subscriptionsId?: string[];
  casterId?: string[];
  supportsId?: string[];
  created_At: Date;
  updated_At: Date;
}

export interface IUser {
  _id: string; //! ObjectID
  name: string;
  email: string;
  favoritesId?: string[]; //! ObjectId
  subscriptionsId?: string[];
  casterId?: string[];
  supportsId?: string[];
  created_At: Date;
  updated_At: Date;
}
