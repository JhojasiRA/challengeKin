Feature: As an admin of an organization, I want to manage the access to my application, granting, modifying and removing permissions as needed

    @TearDownAddAccess @SyntheticTrx @accesManagement
    Scenario: Add access to a user to the tenant with role administrator
        Given the user "testuser21" has joined the last accessed tenant with role "Contributor"
        And the user opens the Le Mans portal
        And the user submits the form with its credentials
        And the user accepts the EULA testing eula "false"
        When the admin grants access to the user "testuser21@rockwellautomation.com" to the resource "Organization" with role "Administrator"
        Then the admin should see that the user "testuser21@rockwellautomation.com" has correct access to the resource "Organization" with role "Admin"

    @TearDownAddAccess @SyntheticTrx @accesManagement
    Scenario: Add access to a user to the tenant with role contributor
        Given the user "testuser21" has joined the last accessed tenant with role "Admin"
        And the user opens the Le Mans portal
        And the user submits the form with its credentials
        And the user accepts the EULA testing eula "false"
        When the admin grants access to the user "testuser21@rockwellautomation.com" to the resource "Organization" with role "Contributor"
        Then the admin should see that the user "testuser21@rockwellautomation.com" has correct access to the resource "Organization" with role "Contributor"

    @TearDownAddAccess @SyntheticTrx @accesManagement
    Scenario: Add access to a user to the tenant with role billing admin
        Given the user "testuser21" has joined the last accessed tenant with role "Admin"
        And the user opens the Le Mans portal
        And the user submits the form with its credentials
        And the user accepts the EULA testing eula "false"
        When the admin grants access to the user "testuser21@rockwellautomation.com" to the resource "Organization" with role "Billing Admin"
        Then the admin should see that the user "testuser21@rockwellautomation.com" has correct access to the resource "Organization" with role "Billing Admin"

    @TearDownAddAccess @SyntheticTrx @accesManagement
    Scenario: Add access to a user to a service with role administrator
        Given the user "testuser21" has joined the last accessed tenant with role "Contributor"
        And the user opens the Le Mans portal
        And the user submits the form with its credentials
        And the user accepts the EULA testing eula "false"
        When the admin adds access to user "George Martin" to the service "Vault" with role "Administrator"
        Then the admin should see that the user "testuser21@rockwellautomation.com" has correct access to the resource "Vault" with role "Admin"

    @TearDownAddAccess @SyntheticTrx @accesManagement
    Scenario: Add access to a user to a service with role contributor
        Given the user "testuser21" has joined the last accessed tenant with role "Admin"
        And the user opens the Le Mans portal
        And the user submits the form with its credentials
        And the user accepts the EULA testing eula "false"
        When the admin adds access to user "George Martin" to the service "Vault" with role "Contributor"
        Then the admin should see that the user "testuser21@rockwellautomation.com" has correct access to the resource "Vault" with role "Contributor"
    @SyntheticTrx @accesManagement
    Scenario: Remove access to a user to a tenant with role administrator
        Given the user "testuser21" has joined the last accessed tenant with role "Admin"
        And the user opens the Le Mans portal
        And the user submits the form with its credentials
        And the user accepts the EULA testing eula "false"
        When the owner removes access to the user "testuser21@rockwellautomation.com" to the resource "Organization" with role "Admin"