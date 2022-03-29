Feature: As a user, I want to send access requests to others tenants

Scenario: create a new access request
    When it send an access request POST "/api/accessrequests"
    Then creates a new access request response should be: status "201" ok

Scenario: delete an access request
    When it send a request to revoke the currently access request "/api/accessrequests/{id}"
    Then revoke an access request response should be: status "200" ok

Scenario: access request id not found
    When it send an access request GET "/api/accessrequests/{id}"
    Then the response GET should be: "404" not found

Scenario: recreate a new access request
    When it send an access request POST "/api/accessrequests"
    Then creates a new access request response should be: status "201" ok

Scenario: Gets an access request by id
    When it send an access request GET "/api/accessrequests/{id}"
    Then the access request response should be: "200" ok
    And the access request status should be: "Active"

Scenario: Gets access requests in the current tenant
    When it send an GET access request "/api/accessrequests"
    Then the GET access request response should be: "200" ok

Scenario: Approve an access request
    When it send an access requests POST to approve "/api/accessrequests/{id}/approve"
    Then the access request approve response should be: "200" ok
    And the access request GET status should be: "Granted"