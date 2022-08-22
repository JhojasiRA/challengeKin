Feature: As an admin, I want to send notifications to users and tenants
   @ApiNotifications @APITest
   Scenario: Create a user notification
      When it sends a POST request to create a user notification "/api/messages/user/Id"
      Then The POST request user notification should be: status "200" ok
   @ApiNotifications @APITest
   Scenario: Get all user notifications
      When It sends a GET request to get all user messages "/api/messages"
      Then The GET request all user notifications should be: status "200" ok
   @ApiNotifications @APITest
   Scenario: Get a specific user Message
      When it sends a GET request to get a specific user message "/api/messages/id"
      Then The GET request to a specific user message should be: status "200" ok
   @ApiNotifications @APITest
   Scenario: Delete all notifications
      When it send erase request "/api/messages/messageId"
      Then The message request Should be: status "204" ok