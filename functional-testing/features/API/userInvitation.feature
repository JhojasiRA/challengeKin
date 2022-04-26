Feature: As a user, I want to use api invitation with different method
@ApiInvitation @APITest
Scenario: creating a new invitation
    When it send an invitation POST "/api/invitations"
    Then invites a new user as "Admin" level to the "Vault" service, response should be: status "200" ok
    And the user should see that the invitation gets "Active"
@ApiInvitation @APITest
Scenario: Gets an invitation by id
    When it send an invitation GET "/api/invitations/{id}"
    Then the invitations should be: "200" ok
    And the invitation status should be: "Active"
    And the resourceType invitation should be: "Tenant"
@ApiInvitation @APITest
Scenario: Accept an invitation
    When it send an invitation POST to accept "/api/invitations/{id}/accept"
    Then invitation response once was approved should be: "200" ok