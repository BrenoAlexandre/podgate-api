import { Document, ObjectId } from 'mongoose';

export interface IFavoriteDocument extends Document {
  _id: ObjectId;
  userId: string;
  feedsId: string[];
  created_At?: Date;
  updated_At?: Date;
  addFeed(feedId: string): Promise<IFavoriteDocument>;
  removeFeed(feedId: string): Promise<IFavoriteDocument>;
}
