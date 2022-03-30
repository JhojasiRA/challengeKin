import {When, Then } from '@cucumber/cucumber';
import {assert} from 'chai'; 
import {createUserNotification,createTenantNotification,getAllNotifications,getMessageByUserId,getMessageByTenantId,patchReadProperty,patchAllProperties,deleteByMessageId} from '../../services/NotificationService';


    When('it send a POST request to create a user notification {string}', async(endpoint) => {
        console.log(endpoint);
    });
  
    Then('The POST request user notification should be: status {string} ok', async(status) => {
        let statusUser = await createUserNotification(); 
        assert.equal(status,statusUser.status);
    });
  
    When('it send a POST request to create a tenant notification {string}', async(endpoint) => {
        console.log(endpoint);
    });
  
    Then('The POST request tenant notification should be: status {string} ok', async(status) => {
        let statusTenant = await createTenantNotification(); 
        assert.equal(status,statusTenant.status);
    });
//------------------Notifications access request and invitations-------------------------
    When('It send a GET request to get all user messages {string}', async(endpoint) => {
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
    When('it send a GET request to get a specific user message {string}', async(endpoint) => {
        console.log(endpoint);
    });
  
    Then('The GET request to a specific user message should be: status {string} ok', async(status) => {
        let statusNotifications = await getMessageByUserId(); 
        assert.equal(status,statusNotifications);
    });
 
    When('it send a GET request to get a specific tenant message {string}', async(endpoint) => {
        console.log(endpoint);
    });
  
    Then('The GET request to a specific tenant message should be: status {string} ok', async(status) => {
        let statusNotifications = await getMessageByTenantId(); 
        assert.equal(status,statusNotifications);
    });

    When('it send a PATCH request to update read property of a message {string}', async(endpoint) => {
        console.log(endpoint);
    });
  
    Then('The PACTH request should be: status {string} ok', async(status) => {
        let statusPropertie = await patchReadProperty(); 
        assert.equal(status,statusPropertie);
    });

    When('it send a PATCH request to update read property {string}', async(endpoint) => {
        console.log(endpoint);
    });
  
    Then('The PACTH request of messages should be: status {string} ok', async(status) => {
        let statusProperties = await patchAllProperties(); 
        assert.equal(status,statusProperties);
    });
  
    When('it send erase request {string}', async(endpoint) => {
        console.log(endpoint);
    });
  
    Then('The message request Should be: status {string} ok', async(status) => {
        let statusProperties = await deleteByMessageId(); 
        assert.equal(status,statusProperties);
    });