import { getCategoriesResponseDTO } from 'adapters/controllers/feeds/DTOs';
import { IFeedDocument, IFeedInput } from 'models/IFeedModel';
import FeedModel from 'models/implementations/FeedModel';
import IFeedRepository from 'repositories/IFeedRepository';

export default class FeedRepository implements IFeedRepository {
  async save(feed: IFeedInput): Promise<IFeedDocument | null> {
    const newFeed = await FeedModel.create<IFeedInput>(feed);

    return newFeed ?? null;
  }

  async findFeedByUrl(url: string): Promise<IFeedDocument | null> {
    const feed = FeedModel.findOne({ url: url });
    return feed ?? null;
  }

  async findFeedById(id: string): Promise<IFeedDocument | null> {
    const feed = FeedModel.findOne({ _id: id });
    return feed ?? null;
  }

  async fetchCategories(): Promise<getCategoriesResponseDTO[] | null> {
    const categories = await FeedModel.aggregate([
      { $group: { _id: '$category', feeds: { $push: '$$ROOT' } } },
    ]);

    return categories;
  }

  async fetchFeedsByCategory(
    category: string
  ): Promise<IFeedDocument[] | null> {
    const feeds = await FeedModel.find({ category });

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
