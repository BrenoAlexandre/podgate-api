import { Document, ObjectId } from 'mongoose';

export interface ISubscriptionDocument extends Document {
  _id: ObjectId;
  userId: string;
  feedsId: string[];
  created_At?: Date;
  updated_At?: Date;
  addFeed(feedId: string): Promise<ISubscriptionDocument>;
  removeFeed(feedId: string): Promise<ISubscriptionDocument>;
}
