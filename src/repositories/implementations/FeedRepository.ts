import { IFeedDocument, IFeedInput } from 'models/IFeedModel';
import FeedModel from 'models/implementations/FeedModel';
import IFeedRepository from 'repositories/IFeedRepository';

export default class FeedRepository implements IFeedRepository {
  async save(feed: IFeedInput): Promise<IFeedDocument | null> {
    return await FeedModel.create<IFeedInput>(feed);
  }

  async findFeedByUrl(url: string): Promise<IFeedDocument | null> {
    const feed = FeedModel.findOne({ url: url });
    return feed ?? null;
  }

  async findFeedById(id: string): Promise<IFeedDocument | null> {
    const feed = FeedModel.findOne({ _id: id });
    return feed ?? null;
  }

  async fetchFeedsGenres(): Promise<
    { genre: string; feeds: IFeedDocument[] }[] | null
  > {
    //? para cada categoria, quero buscar os seus podcasts, ordenando pela categoria mais populada
    const genres = await FeedModel.aggregate([{ $group: { _id: '$genre' } }]);
    console.log('Categorias:', genres); //TODO Testa essa porra aqui
    return genres;
  }

  async fetchFeedsByGenre(genre: string): Promise<IFeedDocument[] | null> {
    const feeds = await FeedModel.aggregate([
      {
        $match: {
          genre,
        },
        $sort: {
          title: 1,
        },
      },
    ]);

    return feeds ?? null;
  }

  async deleteFeedById(id: string): Promise<boolean> {
    const deletedFeed = await FeedModel.deleteOne({ _id: id });
    return deletedFeed.acknowledged;
  }

  async changeFeedPrivacy(
    id: string,
    privacy: boolean
  ): Promise<IFeedDocument | null> {
    const feed = await FeedModel.findById(id);

    if (!feed) return null;

    feed.isPrivate = privacy;
    await feed.save();
    return feed;
  }

  async claimFeed(
    feedId: string,
    ownerId: string
  ): Promise<IFeedDocument | null> {
    // const user = await UserModel.findById(ownerId); //!Buscar o caster
    // if (!user) return null;
    const feed = await FeedModel.findById(feedId);
    if (!feed) return null;

    // feed.casterId = user._id;

    return feed;
  }
}
