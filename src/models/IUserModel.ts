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
  favoritesId: ObjectId | null;
  subscriptionsId: ObjectId | null;
  casterId: ObjectId | null;
  supportsId: ObjectId | null;
  created_At?: Date;
  updated_At?: Date;
  setPassword(newPassword: string): Promise<boolean>;
  comparePassword(candidatePassword: string): Promise<boolean>;
}
