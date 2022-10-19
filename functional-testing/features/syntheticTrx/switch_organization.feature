Feature: Switch Organizations

    Background:  Be on the Le Mans portal
        Given the user opens the Le Mans portal
        When the user submits the form with its credentials

    @SyntheticTr
    Scenario: Switch between organizations
        When the user switchs from "org1" to "Organization automation"
        Then the user should see "Organization automation" profile on the navBar
    
    @SyntheticTr
    Scenario: last Organization switched
        Then the user should see "Organization automation" profile on the navBar