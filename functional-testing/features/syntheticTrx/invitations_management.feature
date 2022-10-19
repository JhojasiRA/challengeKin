Feature: Invitations Management

    Background:  Be on the Le Mans portal
        Given the user opens the Le Mans portal
    
    @invitationManagement @SyntheticTrx
    Scenario: Invite a user to a service
        Given the user submits the form with its credentials
        When the user invites "testuser6@rockwellautomation.com" to the resource "Service: FactoryTalk Vault" with role "Contributor"
        Then user should see the invitation is carried out successfully

    @invitationManagement @SyntheticTrx
    Scenario: Invite multiple users to a service
        Given the user submits the form with its credentials
        When the user invites "testuser5@rockwellautomation.com;testuser6@rockwellautomation.com" to the resource "Service: FactoryTalk Vault" with role "Contributor"
        Then user should see all the invitations are carried out successfully

    #Resource options: Vault, FTRA, Tenant
    @invitationManagement @SyntheticTrx
    Scenario: Resend an invitation to a user
        Given the user submits the form with its credentials
        And an invitation has been made to the user "testuser6@rockwellautomation.com" with the role "Contributor" to the resource "Tenant" 
        When the user resends the invitation to the user mentioned
        Then user should see that the invitation is resent successfully

    @invitationManagement @SyntheticTrx
    Scenario: Cancel an active invitation
        Given the user submits the form with its credentials
        And an invitation has been made to the user "testuser6@rockwellautomation.com" with the role "Contributor" to the resource "Vault" 
        When the user tries to cancel the active invitation
        Then the user should see that the invitation gets canceled successfully

    @invitationManagement @SyntheticTrx
    Scenario: Invite a user to a service with role billing admin
        Given the user submits the form with its credentials
        When the user invites "testuser6@rockwellautomation.com" to the resource "Service: FactoryTalk Vault" with role "BillingAdmin"
        Then user should see the invitation is carried out successfully
