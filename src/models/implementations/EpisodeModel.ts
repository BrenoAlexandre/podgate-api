import { model, Schema } from 'mongoose';
import { IEpisodeDocument, IEpisodeInput } from 'models/IEpisodeModel';

const EpisodeSchema = new Schema<IEpisodeDocument>(
  {
    feedId: {
      type: String,
      ref: 'Feed',
      required: true,
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
          type: Number,
          required: true,
        },
        pubDate: {
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
  feedId: string
): Promise<IEpisodeDocument> {
  const episodeList = this as IEpisodeDocument;

  episodeList.feedId = feedId;
  episodeList.save();

  return episodeList;
};

const EpisodeModel = model<IEpisodeDocument>('UserEpisodes', EpisodeSchema);

export default EpisodeModel;
