import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface CreateNotificationData {
  userId: string;
  type: 'event' | 'comment' | 'announcement' | 'verification';
  title: string;
  message: string;
  actionUrl?: string;
  avatar?: string;
}

/**
 * Service for managing user notifications
 */
export class NotificationService {
  private static notificationsCollection = collection(db, 'notifications');

  /**
   * Create a new notification for a user
   */
  static async createNotification(data: CreateNotificationData): Promise<void> {
    try {
      await addDoc(this.notificationsCollection, {
        ...data,
        read: false,
        timestamp: serverTimestamp(),
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  }

  /**
   * Create a notification for multiple users
   */
  static async createBulkNotifications(
    userIds: string[],
    notificationData: Omit<CreateNotificationData, 'userId'>
  ): Promise<void> {
    try {
      const promises = userIds.map(userId =>
        this.createNotification({ ...notificationData, userId })
      );
      await Promise.all(promises);
    } catch (error) {
      console.error('Error creating bulk notifications:', error);
      throw error;
    }
  }

  /**
   * Create an event-related notification
   */
  static async notifyEventRegistration(
    userId: string,
    eventTitle: string,
    eventId: string
  ): Promise<void> {
    await this.createNotification({
      userId,
      type: 'event',
      title: 'Event Registration Confirmed',
      message: `You have successfully registered for "${eventTitle}"`,
      actionUrl: `/events/${eventId}`,
    });
  }

  /**
   * Create a verification notification for community leads
   */
  static async notifyVerificationUpdate(
    userId: string,
    status: 'approved' | 'rejected' | 'pending'
  ): Promise<void> {
    const messages = {
      approved: 'Your community verification has been approved!',
      rejected: 'Your community verification was not approved. Please contact support.',
      pending: 'Your community verification request is under review.',
    };

    await this.createNotification({
      userId,
      type: 'verification',
      title: 'Community Verification Update',
      message: messages[status],
      actionUrl: '/verification',
    });
  }
}