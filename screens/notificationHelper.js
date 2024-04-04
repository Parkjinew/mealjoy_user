import * as Notifications from 'expo-notifications';

export const sendNotification = async (title, body) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
    },
    trigger: null, // 즉시 전송
  });
};