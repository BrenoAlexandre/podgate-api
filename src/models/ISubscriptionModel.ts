import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface ISubscriptionDocument extends Document {
  _id: ObjectId;
  userId: ObjectId;
  feedsId: ObjectId[];
  created_At?: Date;
  updated_At?: Date;
  addFeed(feedId: string): Promise<ISubscriptionDocument>;
  removeFeed(feedId: string): Promise<ISubscriptionDocument>;
}
