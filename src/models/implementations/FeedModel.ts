import { IFeedDocument } from 'models/IFeedModel';
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
    photoUrl: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    episodes: {
      type: [String],
      required: false,
    },
    isPrivate: {
      type: Boolean,
      required: true,
      default: false,
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

const FeedModel = model<IFeedDocument>('Feed', FeedSchema);

export default FeedModel;
