import { EStatus } from 'enums';
import SupportModel from 'models/implementations/SupportModel';
import { ISupportDocument } from 'models/ISupportModel';
import ISupportRepository from 'repositories/ISupportRepository';

export default class SupportRepository implements ISupportRepository {
  async submitSupportRequest(
    userId: string,
    feedId: string,
    receiptUrl: string
  ): Promise<ISupportDocument> {
    const supportList = await SupportModel.findOne({ userId });

    if (supportList) {
      supportList.feeds.push({ feedId, receiptUrl, status: EStatus.PENDING });

      await supportList.save();
      return supportList;
    }

    const newSupportObj = {
      userId,
      feeds: [
        {
          feedId,
          receiptUrl,
          status: EStatus.PENDING,
        },
      ],
    };

    const newSupportList = await SupportModel.create(newSupportObj);
    return newSupportList;
  }

  async getSupportRequests(feedId: string): Promise<ISupportDocument[]> {
    const pendingSupports = await SupportModel.aggregate([
      { $match: { 'feeds.feedId': feedId, 'feeds.status': EStatus.PENDING } },
    ]);

    return pendingSupports;
  }

  async replySupportRequest(
    supportId: string,
    feedId: string,
    requestStatus: EStatus
  ): Promise<ISupportDocument | null> {
    const supportList = await SupportModel.findById(supportId);

    if (!supportList) return null;

    supportList.updateStatus(feedId, requestStatus);
    return supportList;
  }

  async updateSupportReceipt(
    supportId: string,
    feedId: string,
    newReceiptUrl: string
  ): Promise<ISupportDocument | null> {
    const supportList = await SupportModel.findById(supportId);

    if (!supportList) return null;

    supportList.updateReceipt(feedId, newReceiptUrl);
    return supportList;
  }

  async revokeSupport(
    supportId: string,
    feedId: string
  ): Promise<ISupportDocument | null> {
    const supportList = await SupportModel.findById(supportId);

    if (!supportList) return null;

    supportList.updateStatus(feedId, EStatus.REVOKED);
    return supportList;
  }
}
