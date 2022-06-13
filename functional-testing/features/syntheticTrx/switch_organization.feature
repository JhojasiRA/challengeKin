Feature: As a User, I want to switch between organizations using the navBar

    Background:  Be on the Le Mans portal
        Given the user opens the Le Mans portal
        When the user submits the form with its credentials

    @SyntheticTrx
    Scenario: Switch between organizations
        When the user switchs from "org1" to "organization automation"
        Then the user should see "Organization automation" profile on the navBar
    
    @SyntheticTrx
    Scenario: last Organization switched
        Then the user should see "Organization automation" profile on the navBar