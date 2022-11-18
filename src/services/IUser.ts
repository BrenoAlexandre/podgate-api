export interface IUser {
  _id: string; //! ObjectID
  name: string;
  email: string;
  favoritesId?: string; //! ObjectId
  subscriptionsId?: string; //! ObjectId
  casterId?: string; //! ObjectId
  supportsId?: string; //! ObjectId
  created_At: Date;
  updated_At: Date;
}
