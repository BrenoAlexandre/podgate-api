import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';
import { EStatus } from '../../../enums';

export interface ICasterInput {
  userId: ObjectId;
  feedId: ObjectId;
  proofUrl: string;
}

export interface ICasterDocument extends Document {
  _id: ObjectId;
  userId: ObjectId;
  feeds: {
    feedId: ObjectId;
    proofUrl: string;
    status: EStatus;
    approvedAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
  updateStatus(feedId: ObjectId, newStatus: EStatus): Promise<ICasterDocument>;
}
