import { model, Schema } from 'mongoose';
import { IEpisodeDocument, IEpisodeInput } from 'models/IEpisodeModel';
import { ObjectId } from 'mongodb';

const EpisodeSchema = new Schema<IEpisodeDocument>(
  {
    feedId: {
      type: ObjectId,
      ref: 'Feed',
      unique: true,
    },
    episodes: [
      {
        photoUrl: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
        },
        length: {
          type: String,
          required: true,
        },
        pubDate: {
          type: Date,
        },
        audioUrl: {
          type: String,
          required: true,
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

EpisodeSchema.methods.addEpisode = async function (
  episode: IEpisodeInput
): Promise<IEpisodeDocument> {
  const episodeList = this as IEpisodeDocument;

  const episodes = episodeList.episodes;
  const newList = [...episodes, episode];

  episodeList.episodes = newList;
  await episodeList.save();

  return episodeList;
};

EpisodeSchema.methods.addEpisodes = async function (
  episodes: IEpisodeInput[]
): Promise<IEpisodeDocument> {
  const episodeList = this as IEpisodeDocument;

  const oldEpisodes = episodeList.episodes;
  const newList = [...oldEpisodes, ...episodes];

  episodeList.episodes = newList;
  await episodeList.save();

  return episodeList;
};

EpisodeSchema.methods.changeFeedId = async function (
  feedId: ObjectId
): Promise<IEpisodeDocument> {
  const episodeList = this as IEpisodeDocument;

  episodeList.feedId = new ObjectId(feedId);
  episodeList.save();

  return episodeList;
};

const EpisodeModel = model<IEpisodeDocument>('Episodes', EpisodeSchema);

export default EpisodeModel;
