Feature: Mailosaur POC

    Background:  Be on the Le Mans portal
        Given the user opens the Le Mans portal
        And the user submits the form with its credentials
    
    @mailosaur
    Scenario: Invite a user to a service
        When the user invites "mailosaur-test1@hfdfqcah.mailosaur.net" to the resource "Service: FactoryTalk Remote Access" with role "Contributor"
        And Mailosaur gets the invitation URL and navigate the url