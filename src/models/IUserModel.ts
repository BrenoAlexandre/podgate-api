import { Document, ObjectId } from 'mongoose';

export interface IUserInput {
  name: string;
  lastName: string;
  email: string;
  password: string;
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
  email: IUserDocument['email'];
  password: IUserDocument['password'];
}
export interface IUserDocument extends IUserInput, Document {
  _id: ObjectId;
  favoritesId: ObjectId | null;
  subscriptionsId: ObjectId | null;
  casterId: ObjectId | null;
  supportsId: ObjectId | null;
  created_At?: Date;
  updated_At?: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}
