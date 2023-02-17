import { singleton } from 'tsyringe';
import { CustomError } from 'config/CustomError';
import { validateUrl } from 'regex/urlValidation';
import { IFeedDocument } from 'models/IFeedModel';
import FeedRepository from 'repositories/implementations/FeedRepository';
import EpisodeRepository from 'repositories/implementations/EpisodeRepository';
import { fetchFeed } from 'services/fetchFeed';
import { ObjectId } from 'mongodb';

interface validateProps {
  url: string;
  alreadyExists: IFeedDocument | null;
}
@singleton()
export class CreateFeedUseCase {
  constructor(
    private feedRepository: FeedRepository,
    private episodeRepository: EpisodeRepository
  ) {}

  private async validate({ url, alreadyExists }: validateProps) {
    const errors: string[] = [];

    if (!url) {
      errors.push('Empty URL');
    } else {
      const isValidUrl = validateUrl(url);
      if (!isValidUrl) {
        errors.push('Invalid URL');
      }
    }

    if (alreadyExists) {
      errors.push('This URL has already been submitted');
    }

    if (errors.length > 0) {
      throw CustomError.badRequest('Invalid feed url', errors);
    }
  }

  public async execute(data: { url: string }): Promise<IFeedDocument> {
    const { url } = data;

    const alreadyExists = await this.feedRepository.findFeedByUrl(url);

    await this.validate({ ...data, alreadyExists });

    const { episodeData, feedData } = await fetchFeed(url);

    const episodesId = await this.episodeRepository.saveEpisodes(episodeData);
    if (!episodesId)
      throw CustomError.badRequest('Unable to create episodes list.');

    const feedInput = {
      url,
      ...feedData,
      episodesId,
      privateFeed: new ObjectId('63ef1638e35b970c4f18da02'),
    };
    const result = await this.feedRepository.save(feedInput);
    if (!result) throw CustomError.badRequest('Unable to create feed.');

    await this.episodeRepository.updateFeedId(episodesId, result._id);

    return result;
  }
}
