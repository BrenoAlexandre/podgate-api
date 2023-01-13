import { model, Schema } from 'mongoose';
import { ICasterDocument } from 'models/ICasterModel';
import { EStatus } from 'enums';

const CasterSchema = new Schema<ICasterDocument>(
  {
    userId: {
      type: String,
      ref: 'User',
      required: true,
      unique: true,
    },
    feeds: [
      {
        feedId: {
          type: [String],
          ref: 'Feed',
          required: true,
        },
        proofUrl: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          enum: EStatus,
          default: EStatus.PENDING,
        },
        approvedAt: {
          type: Date,
        },
      },
    ],
  },
  {
    timestamps: true,
    toObject: {
      transform: (doc, ret, options) => {
        ret._id = ret._id.toString();
        return ret;
      },
    },
  }
);

const CasterModel = model<ICasterDocument>('UserCasters', CasterSchema);

export default CasterModel;
