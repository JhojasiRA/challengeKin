Feature: As a Customer when I search for Alexa, I want to see if the third option on the second page is available for
  purchase and can be added to the cart.

  Scenario: purchase an available item
    Given the user navigates on the web page
    When The user searches for Alexa
    And The user navigates to the second page
    And The user selects the third item
    Then User will be able to add tje item to the cart