Feature: Mailosaur POC

    Background:  Be on the Le Mans portal
        Given the user opens the Le Mans portal
        And the user submits the form with its credentials
    
    @mailosaur
    Scenario: Invite a user to FTRA service
        When the user invites "mailosaur-test1@hfdfqcah.mailosaur.net" to the resource "Service: FactoryTalk Remote Access" with role "Admin"
        And Mailosaur gets the invitation URL and navigate the url
        #Then
    @mailosaur
    Scenario: Invite a user to FTVault service
        When the user invites "mailosaur-test1@hfdfqcah.mailosaur.net" to the resource "Service: FactoryTalk Vault" with role "Admin"
        And Mailosaur gets the invitation URL and navigate the url
        #Then
    @mailosaur
    Scenario: Invite a user to FTOptix service
        When the user invites "mailosaur-test1@hfdfqcah.mailosaur.net" to the resource "Service: FactoryTalk Optix" with role "Admin"
        And Mailosaur gets the invitation URL and navigate the url
        #Then
    @mailosaur
    Scenario: Invite a user to an organization
        When the user invites "mailosaur-test1@hfdfqcah.mailosaur.net" to the resource "Organization: MailosaurTest" with role "Contributor"
        And Mailosaur gets the invitation URL and navigate the url
        #Then

        