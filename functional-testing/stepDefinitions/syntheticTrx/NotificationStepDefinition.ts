import {When, Then } from '@cucumber/cucumber'
import { notification,question } from '../../support/Hooks';
import {createMultipleNotification} from '../../services/NotificationService'

When('the user goes to the notification option', async() => {
    await createMultipleNotification();
    await notification.icon();
});
When('the user removes a notification from the panel', async() => {
    await notification.removeNotificationFromPanel();
});
When('the user clears one notification on the view all page', async() => {
    await notification.clearNotificationsFromViewAllPage();
});
Then('the user will see one notification less on his NavBar', async() => {
  });

When('the user clears all notifications on the panel notification', async() => {
    await notification.clearAllNotificationsFromPanel();
});
Then('The user will see an {string} panel', async(Notification) => {
    await question.assertElementText(notification.getAllClearMessage(),Notification);
  });

When('the user clears all notifications on the view all page', async() => {
    await notification.deleteAllNotificationsFromViewPage();
});
Then('The user will see an empty page', async() => {
    await question.assertElementNotExist(notification.trashIcon);
  });

