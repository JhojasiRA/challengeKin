Feature: As an admin of an organization, I want to manage the access to my application, granting, modifying and removing permissions as needed

    @TearDownAddAccess @SyntheticTrx @accesManagement
    Scenario: Add access to a user to the tenant with role administrator
        Given the user "testuser21" has joined the last accessed tenant with role "Contributor"
        And the user open the Le Mans portal
        And the user submit the form with its credentials
        And the user accept the EULA testing eula "false"
        When the admin grants access to the user "testuser21@rockwellautomation.com" to the resource "Organization" with role "Administrator"
        Then the admin should see that the user "testuser21@rockwellautomation.com" has correct access to the resource "Organization" with role "Admin"

    @TearDownAddAccess @SyntheticTrx @accesManagement
    Scenario: Add access to a user to the tenant with role contributor
        Given the user "testuser21" has joined the last accessed tenant with role "Admin"
        And the user open the Le Mans portal
        And the user submit the form with its credentials
        And the user accept the EULA testing eula "false"
        When the admin grants access to the user "testuser21@rockwellautomation.com" to the resource "Organization" with role "Contributor"
        Then the admin should see that the user "testuser21@rockwellautomation.com" has correct access to the resource "Organization" with role "Contributor"


    @TearDownAddAccess @SyntheticTrx @accesManagement
    Scenario: Add access to a user to a service with role administrator
        Given the user "testuser21" has joined the last accessed tenant with role "Contributor"
        And the user open the Le Mans portal
        And the user submit the form with its credentials
        And the user accept the EULA testing eula "false"
        When the admin adds access to user "George Martin" to the service "Vault" with role "Administrator"
        Then the admin should see that the user "testuser21@rockwellautomation.com" has correct access to the resource "Vault" with role "Admin"

    @TearDownAddAccess @SyntheticTrx @accesManagement
    Scenario: Add access to a user to a service with role contributor
        Given the user "testuser21" has joined the last accessed tenant with role "Admin"
        And the user open the Le Mans portal
        And the user submit the form with its credentials
        And the user accept the EULA testing eula "false"
        When the admin adds access to user "George Martin" to the service "Vault" with role "Contributor"
        Then the admin should see that the user "testuser21@rockwellautomation.com" has correct access to the resource "Vault" with role "Contributor"
    @SyntheticTrx @accesManagement
    Scenario: Remove access to a user to a tenant with role administrator
        Given the user "testuser21" has joined the last accessed tenant with role "Admin"
        And the user open the Le Mans portal
        And the user submit the form with its credentials
        And the user accept the EULA testing eula "false"
        When the owner removes access to the user "testuser21@rockwellautomation.com" to the resource "Organization" with role "Admin"