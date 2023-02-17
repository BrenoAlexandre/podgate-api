import { model, Schema } from 'mongoose';
import { ObjectId } from 'mongodb';
import { EStatus } from '../../enums';
import { ICasterDocument } from 'models/ICasterModel';

const CasterSchema = new Schema<ICasterDocument>(
  {
    userId: {
      type: ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    feeds: [
      {
        feedId: {
          type: ObjectId,
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

CasterSchema.methods.updateStatus = async function (
  feedId: ObjectId,
  newStatus: EStatus
): Promise<ICasterDocument> {
  const casterProfile = this as ICasterDocument;

  casterProfile.feeds.map((feed) => {
    if (feed.feedId.toString() === feedId.toString()) {
      feed.status = newStatus;
    }
  });

  await casterProfile.save();

  return casterProfile;
};

const CasterModel = model<ICasterDocument>('Caster', CasterSchema);

export default CasterModel;
