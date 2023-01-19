import { Document, ObjectId } from 'mongoose';

export interface IFeedInput {
  url: string;
  title: string;
  description: string;
  photoUrl: string;
  category: string;
  episodesId: string;
}

export interface IFeedDocument extends IFeedInput, Document {
  _id: ObjectId;
  isPrivate: boolean;
  privateFeed?: string;
  casterId: ObjectId;
  created_At?: Date;
  updated_At?: Date;
  updatePrivacy(isPrivate: boolean): Promise<IFeedDocument>;
  setPrivateFeed(feedId?: string): Promise<void>;
}
