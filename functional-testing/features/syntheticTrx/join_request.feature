Feature: Join Request

Background:  Be on the Le Mans portal
    Given the user opens the Le Mans portal
    And the user submits the form with its credentials
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

@joinrequest @SyntheticTrx 
Scenario: Dismiss join request
    When User1 goes to approve user option
    And User1 dismisses the user2 request to join to the organization
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

@joinrequest @SyntheticTrx @TearDownAddAccess
Scenario: Approve a join request to billing admin role
    Given user "testuser1" has applied a join request to the last accessed organization of current user
    When the user tries to approve the join request with role "Billing Admin"
    Then the user should see that the access has been granted 
    And the user should see that "testuser1@rockwellautomation.com" has access to to the approved resource with the role "Billing Admin"

@joinrequest @SyntheticTrx
Scenario: Ask access to the same organization you are in
    Given user copies the organization code 
    When the user tries to join to the organization
    Then user should see a pop up message: "The request was invalid"

@SyntheticTrx @testOrg
Scenario: Ask access to an organization an user already belong
    Given user1 creates an organization 
    When user2 makes the request for the organization created before
    And user1 accepts the request of user2 with role "Administrator"
    And user2 makes the same org request again
    Then user should see a pop up message: "The request was invalid"



    

    
