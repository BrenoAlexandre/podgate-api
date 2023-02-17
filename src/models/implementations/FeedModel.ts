import { IFeedDocument } from 'models/IFeedModel';
import { ObjectId } from 'mongodb';
import { model, Schema } from 'mongoose';

const FeedSchema = new Schema<IFeedDocument>(
  {
    url: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    photoUrl: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    episodesId: {
      type: ObjectId,
      required: true,
      ref: 'Episodes',
    },
    isPrivate: {
      type: Boolean,
      required: true,
      default: false,
    },
    privateFeed: {
      type: ObjectId,
      ref: 'Feeds',
    },
    casterId: { type: Schema.Types.ObjectId, ref: 'feedCaster' },
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

FeedSchema.methods.updatePrivacy = async function (
  isPrivate: boolean
): Promise<IFeedDocument> {
  const feed = this as IFeedDocument;

  feed.isPrivate = isPrivate;

  feed.save();

  return feed;
};

FeedSchema.methods.setPrivateFeed = async function (
  feedId?: ObjectId
): Promise<void> {
  const feed = this as IFeedDocument;

  if (feedId) feed.privateFeed = feedId;
  else feed.privateFeed = undefined;

  feed.save();
};

FeedSchema.methods.claimFeed = async function (data: {
  casterId: ObjectId;
  attachTo?: ObjectId;
  isPrivate?: boolean;
}): Promise<void> {
  const { casterId, isPrivate = false } = data;
  const feed = this as IFeedDocument;

  feed.casterId = casterId;
  if (isPrivate) {
    feed.isPrivate = isPrivate;
  }

  feed.save();
};

const FeedModel = model<IFeedDocument>('Feed', FeedSchema);

export default FeedModel;
