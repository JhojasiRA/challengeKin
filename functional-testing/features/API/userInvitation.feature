Feature: As a user, I want to use api invitation with different method

Scenario: creating a new invitation
    When it send an invitation POST "/api/invitations"
    Then invites a new user as "Admin" level to the "Vault" service, response should be: status "200" ok
    And the user should see that the invitation gets "Active"

Scenario: delete an invitation
    When it send a request to revoke the currently invitation "/api/invitations/{id}"
    Then revoke an invitation response should be: status "200" ok

Scenario: recreate a new invitation
    When it send an invitation POST "/api/invitations"
    Then invites a new user as "Admin" level to the "Vault" service, response should be: status "200" ok

Scenario: Gets an invitation by id
    When it send an invitation GET "/api/invitations/{id}"
    Then the invitations should be: "200" ok
    And the invitation status should be: "Active"
    And the resourceType invitation should be: "Tenant"

Scenario: Accept an invitation
    When it send an invitation POST to accept "/api/invitations/{id}/accept"
    Then invitation response once was approved should be: "200" ok