import { Document, ObjectId } from 'mongoose';

export interface IUserInput {
  name?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

export interface IUserUpdateInput {
  name: string;
  lastName: string;
  email: string;
}

export interface IUserChangePassword {
  email: string;
  password: string;
}

export interface ILoginInput {
  email: string;
  password: string;
}

export interface IUserDocument extends IUserInput, Document {
  _id: ObjectId;
  favoritesId: string | null;
  subscriptionsId: string | null;
  casterId: string | null;
  supportsId: string | null;
  created_At?: Date;
  updated_At?: Date;
  setPassword(newPassword: string): Promise<boolean>;
  comparePassword(candidatePassword: string): Promise<boolean>;
  addFavoritesKey(favoritesId: string): Promise<IUserDocument>;
  addSubscriptionsKey(subscriptionsId: string): Promise<IUserDocument>;
  addCasterKey(casterId: string): Promise<IUserDocument>;
  addSupportsKey(supportsId: string): Promise<IUserDocument>;
}
