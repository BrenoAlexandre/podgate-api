import { Document, ObjectId } from 'mongoose';
import { EStatus } from 'enums';

export interface ICasterDocument extends Document {
  _id: ObjectId;
  userId: string;
  feeds: {
    feedId: string;
    proofUrl: string;
    status: EStatus;
    approvedAt: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}
