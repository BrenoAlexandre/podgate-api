import { singleton } from 'tsyringe';
import { parseString } from 'xml2js';
import { CustomError } from 'config/CustomError';
import FeedRepository from 'repositories/implementations/FeedRepository';
import { IFeedDocument } from 'models/IFeedModel';
import axios from 'axios';
import { validateUrl } from 'regex/urlValidation';

interface validateProps {
  url: string;
  alreadyExists: IFeedDocument | null;
}
@singleton()
export class CreateFeedUseCase {
  constructor(private feedRepository: FeedRepository) {}

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

  private fetchFeedData = async (url: string) => {
    try {
      const feed = await axios.get(url);
      return await new Promise((resolve, reject) =>
        parseString(feed.data, function (err, result) {
          if (err) {
            reject(err);
          }
          resolve(result.rss);
        })
      );
    } catch (err) {
      console.error(err);
    }
  };

  public async execute(data: { url: string }): Promise<IFeedDocument> {
    const { url } = data;

    const alreadyExists = await this.feedRepository.findFeedByUrl(url);

    await this.validate({ ...data, alreadyExists });

    const feedData: any = await this.fetchFeedData(url);

    const episodes = feedData.channel[0].item.map(
      (episode: any) => episode.title[0]
    );

    const feedInput = {
      url,
      title: feedData.channel[0].title[0],
      description: feedData.channel[0].description[0],
      photoUrl: feedData.channel[0].image[0].url[0],
      category: feedData.channel[0]['itunes:category'][0].$.text,
      episodes,
    };

    const result = await this.feedRepository.save(feedInput);

    if (!result) {
      throw CustomError.badRequest('Unable to create feed.');
    }

    return result;
  }
}
