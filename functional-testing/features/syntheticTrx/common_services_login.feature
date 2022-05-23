Feature: As a user, I want to login in FactoryTalk Hub

Background:  Be on the Le Mans portal
    Given the user open the Le Mans portal
@login @SyntheticTrx @Cate
Scenario: Login into Le Mans portal
    When the user submit the form with its credentials 
    And the user accept the EULA testing eula "false"
    Then the user should see the "Home" page
@login @SyntheticTrx
Scenario: Login SAML flow
    When the user logs in with MyRockwell-SAML 
    And the user accept the EULA testing eula "false"
    Then the user should see the "Home" page
@login @SyntheticTrx @testing
Scenario: Logout SAML flow
    Given the user logs in with MyRockwell-SAML
    And the user accept the EULA testing eula "false" 
    When the user logs out
    Then the user should see logout page