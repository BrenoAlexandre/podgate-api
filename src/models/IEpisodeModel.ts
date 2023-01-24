import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface IEpisodeInput {
  photoUrl: string;
  title: string;
  description: string;
  length: string;
  pubDate: Date;
  audioUrl: string;
}

export interface IEpisodeDocument extends Document {
  _id: ObjectId;
  feedId: ObjectId;
  episodes: IEpisodeInput[];
  created_At?: Date;
  updated_At?: Date;
  addEpisode(episode: IEpisodeInput): Promise<IEpisodeDocument>;
  addEpisodes(episodes: IEpisodeInput[]): Promise<IEpisodeDocument>;
  changeFeedId(feedId: ObjectId): Promise<IEpisodeDocument>;
}
