import { EStatus } from '../../enums';
import { ICasterInput, ICasterDocument } from 'models/ICasterModel';
import CasterModel from 'models/implementations/CasterModel';
import { ObjectId } from 'mongodb';
import ICasterRepository from 'repositories/ICasterRepository';

export default class CasterRepository implements ICasterRepository {
  async findCaster(casterId: string): Promise<ICasterDocument | null> {
    const caster = await CasterModel.findOne({
      userId: new ObjectId(casterId),
    });

    if (!caster) return null;

    return caster;
  }
  async submitCasterRequest({
    userId,
    feedId,
    proofUrl,
  }: ICasterInput): Promise<ICasterDocument> {
    const casterProfile = await CasterModel.findOne({ userId });

    if (casterProfile) {
      casterProfile.feeds.push({
        feedId: new ObjectId(feedId),
        proofUrl,
        status: EStatus.PENDING,
        approvedAt: new Date(),
      });

      await casterProfile.save();
      return casterProfile;
    }

    const newCasterObj = {
      userId,
      feeds: [
        {
          feedId,
          proofUrl,
          approvedAt: new Date(),
        },
      ],
    };

    const newCaster = await CasterModel.create(newCasterObj);
    return newCaster;
  }

  async getCasterRequests(): Promise<any[] | null> {
    const pendingRequest = await CasterModel.aggregate([
      { $match: { 'feeds.status': EStatus.PENDING } },
      {
        $lookup: {
          from: 'feeds',
          localField: 'feeds.feedId',
          foreignField: '_id',
          as: 'claimedFeeds',
        },
      },
    ]);

    if (pendingRequest.length === 0) return null;

    return pendingRequest;
  }

  async findPodcastCaster(feedId: ObjectId): Promise<ICasterDocument[] | null> {
    const caster = await CasterModel.aggregate([
      { $match: { 'feeds.feedId': feedId, 'feeds.status': EStatus.APPROVED } },
    ]);

    if (!caster) return null;

    return caster;
  }

  async replyCasterRequest(
    casterId: string,
    feedId: string,
    requestStatus: EStatus
  ): Promise<ICasterDocument | null> {
    const casterProfile = await CasterModel.findOne({ _id: casterId });

    if (!casterProfile) return null;

    const newCasterProfile = casterProfile.updateStatus(
      new ObjectId(feedId),
      requestStatus
    );
    return newCasterProfile;
  }

  async revokeCaster(
    casterId: string,
    feedId: string
  ): Promise<ICasterDocument | null> {
    const casterProfile = await CasterModel.findOne({ casterId });

    if (!casterProfile) return null;

    const newCasterProfile = casterProfile.updateStatus(
      new ObjectId(feedId),
      EStatus.REVOKED
    );

    return newCasterProfile;
  }
}
