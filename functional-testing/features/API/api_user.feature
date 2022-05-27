Feature: As an admin, I want to create, update and delete users
@ApiUser @APITest
Scenario: Create a new user
    When it sends a POST "/api/users"
    Then Response should be: status "201" ok
@ApiUser @APITest
Scenario: user already exist
    When it sends a POST "/api/users"
    Then create a user exist response should be: status "200" useralreadyexist
@ApiUser @APITest
Scenario: get a user by Id
    When it sends a GET "/api/users/userId"
    Then Should be: status "200" ok
@ApiUser @APITest
Scenario: Create an org tenant
    When it send a request post to create a org tenant "/api/tenants/name: org tenant, location: Milwauke, description: org tenant automation"
    Then org tenant response should be: status "201" ok
@ApiUser @APITest
Scenario: get a user by effective roles 
    When it send a effective request GET "/api/users/userId/effectiveroles"
    Then The effective response should be: status "200" ok
    And The effective resourceType should be: "Tenant"
    And The effective role should be: "Owner"
    And The effective resourceName should be: "Personal Tenant"
    And The effective resourceType1 should be: "Service"
    And The effective default service should be: "Vault"
@ApiUser @APITest
Scenario: get org tenant info by Id
    When it send a tenant GET "/api/tenant"
    Then The tenant response Should be: status "200" ok
    And The tenantStatus should be: "Active"
    And The new tenant emailDomain should be: "rockwellautomation.com"
    And The name response of tenant should be: "org tenant"
    And The description should be: "org tenant automation"
    And the location should be: "Milwaukee"
    And the visibility should be: "Private"
@ApiUser @APITest
Scenario: Edit an org tenant
    When it send a put request to edit organization "/api/tenant"
    Then edit org tenant response should be: status "200" ok
@ApiUser @APITest
Scenario: User Entitlements
    When it send a entitlements request GET "/api/users/{userId}/entitlements"
    Then the response of the user entitlements should be: "200" ok
@ApiUser
Scenario: create another user :user2
    When it sends a POST "/api/users"
    Then Response new user2 should be: status "201" ok
@ApiUser @APITest
Scenario: Not allows users access to other users profiles
    When it sends a GET "/api/users/userId"
    Then user access to other users profile should be status: "403" Forbidden
@ApiUser @APITest
Scenario: get a tenant by resource roles
    When the tenant send a request GET "/api/tenant/resourceroles"
    Then tenant Status Should be: "200" ok
@ApiUser @APITest
Scenario: get a tenant by roles
    When the tenant request GET "/api/tenant/resources"
    Then The response tenant should be: status "200" ok
@ApiUser @APITest
Scenario: get a tenant resource by id
    When Tenant resource id request GET "api/tenant/resources/resourceId/resourceroles"
    Then The expected tenant response should be: status "200" ok