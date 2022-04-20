Feature: As an user, I want to send a join request to other user

Background:  Be on the Le Mans portal
    Given the user open the Le Mans portal
    When the user submit the form with its credentials
    And the user accept the EULA testing eula "false"

@joinrequest @SyntheticTrx
Scenario: Send a join request successfuly
    When the user go inside to edit organization option
    And User1 copy a new invite code
    And User1 give to user2 an invite code
    And User2 sign in on his account
    And the user accept the EULA testing eula "false"
    And User2 go inside to the option join request
    And User2 send a join request
    Then the user2 will see a message pop up: "You will be notified once the owner of the organization approves your request"

@joinrequest @SyntheticTrx
Scenario: Dismiss join request
    When User1 go to approve user option
    And User1 dismiss the user2 request to join to the organization
    Then the user1 will see a message pop up: "User request to join your organization will be dismissed."
@joinrequest @SyntheticTrx
Scenario: Send a join request with an outdate invite code
    When the user go inside to edit organization option
    And User1 copy a new invite code
    And User generate a new invide code
    And User1 accept the successfully message
    And User2 go inside to the option join request
    And User2 try to send a join request with a outdate invite code
    Then User2 will see the continue button disabled