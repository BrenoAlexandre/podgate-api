import { Document, ObjectId } from 'mongoose';
import { EStatus } from 'enums';

export interface ICasterInput {
  userId: string;
  feedId: string;
  proofUrl: string;
}

export interface ICasterDocument extends Document {
  _id: ObjectId;
  userId: string;
  feeds: {
    feedId: string;
    proofUrl: string;
    status: EStatus;
    approvedAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
  updateStatus(feedId: string, newStatus: EStatus): Promise<ICasterDocument>;
}
