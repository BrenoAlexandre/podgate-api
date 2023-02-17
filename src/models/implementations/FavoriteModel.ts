import { model, Schema } from 'mongoose';
import { IFavoriteDocument } from 'models/IFavoriteModel';

const FavoriteSchema = new Schema<IFavoriteDocument>(
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

FavoriteSchema.methods.addFeed = async function (
  feedId: string
): Promise<IFavoriteDocument> {
  const favList = this as IFavoriteDocument;

  const feeds = favList.feedsId;

  const newList = [...feeds, feedId];

  favList.feedsId = newList;

  await favList.save();

  return favList;
};

FavoriteSchema.methods.removeFeed = async function (
  feedId: string
): Promise<IFavoriteDocument> {
  const favList = this as IFavoriteDocument;

  const feeds = favList.feedsId;

  const newList = feeds.filter((feed) => feed !== feedId);

  favList.feedsId = newList;

  await favList.save();

  return favList;
};

const FavoriteModel = model<IFavoriteDocument>('UserFavorites', FavoriteSchema);

export default FavoriteModel;
