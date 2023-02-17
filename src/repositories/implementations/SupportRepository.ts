import { EStatus } from '../../enums';
import SupportModel from 'models/implementations/SupportModel';
import { ISupportDocument } from 'models/ISupportModel';
import ISupportRepository from 'repositories/ISupportRepository';
import { ObjectId } from 'mongodb';

export default class SupportRepository implements ISupportRepository {
  async submitSupportRequest(
    userId: string,
    feedId: ObjectId,
    receiptUrl: string
  ): Promise<ISupportDocument> {
    const supportList = await SupportModel.findOne({ userId });

    if (supportList) {
      supportList.feeds.push({
        feedId,
        receiptUrl,
        status: EStatus.PENDING,
      });

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

  async getUserSupports(userId: string): Promise<any[] | null> {
    const supports = await SupportModel.aggregate([
      { $match: { userId: userId } },
      // { $unwind: { path: '$feeds' } },
      {
        $lookup: {
          from: 'feeds',
          localField: 'feeds.feedId',
          foreignField: '_id',
          as: 'supports',
        },
      },

      // {
      //   $project: {
      //     _id: 1,
      //     userId: 1,
      //     feeds: 1,
      //     supports: 1,
      //     createdAt: 1,
      //     updatedAt: 1,
      //   },
      // },
    ]);

    if (supports.length === 0) return null;

    return supports;
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
    feedId: string,
    supportId: string,
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

    let expired = false;

    supportList.feeds.map((feed) => {
      if (feed.feedId === new ObjectId(feedId)) {
        if (feed?.expiresAt && feed?.expiresAt < new Date()) {
          expired = true;
        }
      }
    });

    if (!expired) {
      supportList.updateStatus(feedId, EStatus.REVOKED);
    }
    return supportList;
  }
}
