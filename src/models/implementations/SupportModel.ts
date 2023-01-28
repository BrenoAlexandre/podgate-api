import { model, Schema } from 'mongoose';
import { ISupportDocument } from 'models/ISupportModel';
import { EStatus } from 'enums';
import { add } from 'date-fns';

const SupportSchema = new Schema<ISupportDocument>(
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
          type: String,
          ref: 'Feed',
          required: true,
        },
        receiptUrl: {
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
        expiresAt: {
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

SupportSchema.methods.updateReceipt = async function (
  feedId: string,
  newReceipt: string
): Promise<ISupportDocument> {
  const support = this as ISupportDocument;

  support.feeds.map((feed) => {
    if (feed.feedId === feedId) {
      feed.receiptUrl = newReceipt;
      feed.status = EStatus.PENDING_REAPPROVAL;
    }
  });

  await support.save();

  return support;
};

SupportSchema.methods.updateStatus = async function (
  feedId: string,
  newStatus: EStatus
): Promise<ISupportDocument> {
  const support = this as ISupportDocument;

  support.feeds.map((feed) => {
    if (feed.feedId === feedId) {
      feed.status = newStatus;

      if (newStatus === EStatus.APPROVED) {
        feed.approvedAt = add(Date.now(), {});
        feed.expiresAt = add(Date.now(), { months: 1 });
      } else {
        feed.approvedAt = undefined;
        feed.expiresAt = undefined;
      }
    }
  });

  await support.save();
  return support;
};

const SupportModel = model<ISupportDocument>('UserSupports', SupportSchema);

export default SupportModel;
