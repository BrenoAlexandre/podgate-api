import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface IFeedInput {
  url: string;
  title: string;
  description: string;
  author: string;
  photoUrl: string;
  category: string;
  episodesId: ObjectId;
}

export interface IFeedDocument extends IFeedInput, Document {
  _id: ObjectId;
  isPrivate: boolean;
  privateFeed?: ObjectId;
  casterId: ObjectId;
  created_At?: Date;
  updated_At?: Date;
  updatePrivacy(isPrivate: boolean): Promise<IFeedDocument>;
  setPrivateFeed(feedId?: ObjectId): Promise<void>;
  claimFeed(data: { casterId: ObjectId; isPrivate?: boolean }): Promise<void>;
}
