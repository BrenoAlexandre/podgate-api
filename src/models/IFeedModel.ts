import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface IFeedInput {
  url: string;
  title: string;
  description: string;
  photoUrl: string;
  category: string;
  episodesId: ObjectId;
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
  claimFeed(casterId: ObjectId, isPrivate: boolean): Promise<void>;
}
