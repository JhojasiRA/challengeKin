Feature: As an user, I want to send a join request to other user

Background:  Be on the Le Mans portal
    Given the user opens the Le Mans portal
    When the user submits the form with its credentials
    And the user accepts the EULA testing eula "false"

@joinrequest @SyntheticTrx
Scenario: Send a join request successfuly
    When the user goes inside to edit organization option
    And User1 copies a new invite code
    And User1 gives to user2 an invite code
    And User2 signs in on his account
    And the user accepts the EULA testing eula "false"
    And User2 goes inside to the option join request
    And User2 sends a join request
    Then the user2 will see a message pop up: "You will be notified once the owner of the organization approves your request"

@joinrequest @SyntheticTrx @test5
Scenario: Dismiss join request
    When User1 goes to approve user option
    And User1 dismiss the user2 request to join to the organization
    Then the user1 will see a message pop up: "User request to join your organization will be dismissed."
@joinrequest @SyntheticTrx
Scenario: Send a join request with an outdate invite code
    When the user goes inside to edit organization option
    And User1 copies a new invite code
    And User generates a new invide code
    And User1 accepts the successfully message
    And User2 goes inside to the option join request
    And User2 tries to send a join request with a outdate invite code
    Then User2 will see the continue button disabled