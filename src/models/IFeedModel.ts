import { Document, ObjectId } from 'mongoose';

export interface IFeedInput {
  url: string;
  title: string;
  description: string;
  photoUrl: string;
  category: string;
  episodes: string[];
}

export interface IFeedDocument extends IFeedInput, Document {
  _id: ObjectId;
  isPrivate: boolean;
  casterId: ObjectId;
}
