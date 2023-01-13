import { Document, ObjectId } from 'mongoose';
import { EStatus } from 'enums';

export interface SupportFeed {
  feedId: string;
  receiptUrl: string;
  status: EStatus;
  approvedAt?: Date;
  expiresAt?: Date;
}

export interface ISupportDocument extends Document {
  _id: ObjectId;
  userId: string;
  feeds: SupportFeed[];
  created_At?: Date;
  updated_At?: Date;
  updateReceipt(feedId: string, newReceipt: string): Promise<ISupportDocument>;
  updateStatus(feedId: string, newStatus: EStatus): Promise<ISupportDocument>;
}
