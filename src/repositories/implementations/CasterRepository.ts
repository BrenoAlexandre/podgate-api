import { EStatus } from 'enums';
import { ICasterInput, ICasterDocument } from 'models/ICasterModel';
import CasterModel from 'models/implementations/CasterModel';
import ICasterRepository from 'repositories/ICasterRepository';

export default class CasterRepository implements ICasterRepository {
  async submitCasterRequest({
    userId,
    feedId,
    proofUrl,
  }: ICasterInput): Promise<ICasterDocument> {
    const casterProfile = await CasterModel.findOne({ userId });

    if (casterProfile) {
      casterProfile.feeds.push({
        feedId,
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

  async getCasterRequests(): Promise<ICasterDocument[]> {
    const pendingRequest = await CasterModel.aggregate([
      { $match: { 'feeds.status': EStatus.PENDING } },
    ]);

    return pendingRequest;
  }

  async replyCasterRequest(
    casterId: string,
    feedId: string,
    requestStatus: EStatus
  ): Promise<ICasterDocument | null> {
    const casterProfile = await CasterModel.findOne({ casterId });

    if (!casterProfile) return null;

    const newCasterProfile = casterProfile.updateStatus(feedId, requestStatus);
    return newCasterProfile;
  }

  async revokeCaster(
    casterId: string,
    feedId: string
  ): Promise<ICasterDocument | null> {
    const casterProfile = await CasterModel.findOne({ casterId });

    if (!casterProfile) return null;

    const newCasterProfile = casterProfile.updateStatus(
      feedId,
      EStatus.REVOKED
    );

    return newCasterProfile;
  }
}
