import { model, Schema } from 'mongoose';
import { ISubscriptionDocument } from 'models/ISubscriptionModel';

const SubscriptionSchema = new Schema<ISubscriptionDocument>(
  {
    userId: {
      type: String,
      ref: 'User',
      required: true,
      unique: true,
    },
    feedsId: {
      type: [String],
      ref: 'Feed',
      required: true,
      unique: true,
    },
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

SubscriptionSchema.methods.addFeed = async function (
  feedId: string
): Promise<ISubscriptionDocument> {
  const subList = this as ISubscriptionDocument;

  const feeds = subList.feedsId;

  const newList = [...feeds, feedId];

  subList.feedsId = newList;

  await subList.save();

  return subList;
};

SubscriptionSchema.methods.removeFeed = async function (
  feedId: string
): Promise<ISubscriptionDocument> {
  const subList = this as ISubscriptionDocument;

  const feeds = subList.feedsId;

  const newList = feeds.filter((feed) => feed !== feedId);

  subList.feedsId = newList;

  await subList.save();

  return subList;
};

const SubscriptionModel = model<ISubscriptionDocument>(
  'UserSubscriptions',
  SubscriptionSchema
);

export default SubscriptionModel;
