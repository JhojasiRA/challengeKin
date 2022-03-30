Feature: As a user, I want to navigate into the top bar of homePage

Background: Be on the Le Mans portal
    Given the user open the Le Mans portal
    When the user submit the form with its credentials
     
Scenario: navigate into top bar
    When the user go inside on the help icon
    And the user go inside on Online help option
    Then the user should see the page "FactoryTalk Design Hub Help"
    When the user go inside on getting started option
    Then the user should see "Getting Started" page tittle
    When the user go inside on provide feedback option
    And the user go inside on Release Notes
    Then the user should see page with title "Release Notes"
    And the user click on about option
    When the user click on its profile
    Then the user should see "SIGN IN" page