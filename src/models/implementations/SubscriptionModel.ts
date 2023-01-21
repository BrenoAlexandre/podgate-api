import { model, Schema } from 'mongoose';
import { ISubscriptionDocument } from 'models/ISubscriptionModel';
import { ObjectId } from 'mongodb';

const SubscriptionSchema = new Schema<ISubscriptionDocument>(
  {
    userId: {
      type: ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    feedsId: [
      {
        type: ObjectId,
        ref: 'Feed',
        required: true,
        unique: true,
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

SubscriptionSchema.methods.addFeed = async function (
  feedId: string
): Promise<ISubscriptionDocument> {
  const subList = this as ISubscriptionDocument;

  const feeds = subList.feedsId;

  const newList = [...feeds, new ObjectId(feedId)];

  subList.feedsId = newList;

  await subList.save();

  return subList;
};

SubscriptionSchema.methods.removeFeed = async function (
  feedId: string
): Promise<ISubscriptionDocument> {
  const subList = this as ISubscriptionDocument;

  const feeds = subList.feedsId;

  const newList = feeds.filter((feed) => feed.toString() !== feedId);

  subList.feedsId = newList;

  await subList.save();

  return subList;
};

const SubscriptionModel = model<ISubscriptionDocument>(
  'UserSubscriptions',
  SubscriptionSchema
);

export default SubscriptionModel;
