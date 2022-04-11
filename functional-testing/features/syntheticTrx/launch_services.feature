Feature: As a user, I want to launch vault into Le Mans portal

Background:  Be on the Le Mans portal
    Given the user open the Le Mans portal
    When the user submit the form with its credentials
@LaunchServices @SyntheticTrx
 Scenario: Launch vault into Home page
    When the user launch the vault card
    Then the user should see the "Vault" page of controller project

@LaunchServices @SyntheticTrx
Scenario: sign out vault and homepage
    When the user launch the vault card
    And the user sign out the home page
    Then the user should see logout page
@LaunchServices @SyntheticTrx
Scenario: Launch FTRA service without entitlement
    When the user launch the FTRA card
    Then the user does not have access to the FTRA service