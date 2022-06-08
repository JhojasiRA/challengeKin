Feature: As a User, I want to switch between organizations using the navBar

Background:  Be on the Le Mans portal
    Given the user opens the Le Mans portal
    When the user submits the form with its credentials

@1
Scenario: Switch between organizations
    When the user switchs from "org1" to "organization automation"
    Then the user should see "organization automation" view home page