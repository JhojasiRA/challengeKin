Feature: As a user, I want to login in FactoryTalk Hub

Background:  Be on the Le Mans portal
    Given the user open the Le Mans portal
@login @SyntheticTrx
Scenario: Login into Le Mans portal
    When the user submit the form with its credentials 
    And the user accept the EULA testing eula "false"
    Then the user should see the "Home" page