Feature: As an admin, I want to send notifications to users and tenants

Scenario: Create a user notification
   When it send a POST request to create a user notification "/api/messages/user/Id"
   Then The POST request user notification should be: status "200" ok

Scenario: Create a tenant notification
   When it send a POST request to create a tenant notification "/api/messages/tenant/Id"
   Then The POST request tenant notification should be: status "200" ok

Scenario: Get all logged in user Messages
 When It send a GET request to get all user messages "/api/messages"
 Then The GET request all user notifications should be: status "200" ok

Scenario: Get a specific user Message 
 When it send a GET request to get a specific user message "/api/messages/id"
 Then The GET request to a specific user message should be: status "200" ok

Scenario: Get a specific tenant Message 
 When it send a GET request to get a specific tenant message "/api/messages/id"
 Then The GET request to a specific tenant message should be: status "200" ok

Scenario: Update read property to specific message 
 When it send a PATCH request to update read property of a message "/api/messages/messageId"
 Then The PACTH request should be: status "200" ok

 Scenario: Update read property 
 When it send a PATCH request to update read property "/api/messages/messageId"
 Then The PACTH request of messages should be: status "200" ok

 Scenario: Delete notification by message id
  When it send erase request "/api/messages/messageId"
  Then The message request Should be: status "204" ok