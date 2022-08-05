import {When, Then } from '@cucumber/cucumber';
import {assert} from 'chai'; 
import {createNotification,getAllNotifications,getMessageById,deleteAllMessages} from '../../services/NotificationService';


    When('it sends a POST request to create a user notification {string}', async(endpoint) => {
        console.log(endpoint);
    });
  
    Then('The POST request user notification should be: status {string} ok', async(status) => {
        let statusUser = await createNotification(); 
        assert.equal(status,statusUser.status);
    });
  
//------------------Notifications access request and invitations-------------------------
    When('It sends a GET request to get all user messages {string}', async(endpoint) => {
        console.log(endpoint);
    });
  
    Then('The GET request all user notifications should be: status {string} ok', async(status) => {
        let notifications = await getAllNotifications(); 
        assert.equal(status,notifications.status);
    });
    Then('The user should be into the notifications {string}', async(notificationMessage) => {
        let notifications = await getAllNotifications(); 
        assert.equal(notificationMessage,notifications.Message);
    });
//------------------------------------------------------------------------ -----------
    When('it sends a GET request to get a specific user message {string}', async(endpoint) => {
        console.log(endpoint);
    });
  
    Then('The GET request to a specific user message should be: status {string} ok', async(status) => {
        let statusNotifications = await getMessageById(); 
        assert.equal(status,statusNotifications);
    });
//----------------------------
    When('it send erase request {string}', async(endpoint) => {
        console.log(endpoint);
    });
  
    Then('The message request Should be: status {string} ok', async(status) => {
        let statusProperties = await deleteAllMessages(); 
        assert.equal(status,statusProperties);
    });