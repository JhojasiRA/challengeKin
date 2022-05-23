import {When, Then } from '@cucumber/cucumber'
import { notification } from '../../support/Hooks';

When('the user goes to the notification option', async() => {
    await notification.icon();
});
When('the user removes a notification from the panel', async() => {
    await notification.removeNotification();

});
Then('the user will see one notification less on his NavBar', async() => {
  });