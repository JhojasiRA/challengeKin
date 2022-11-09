Feature: Utility Credits

Background:  Be on the Le Mans portal
    Given the user opens the Le Mans portal
    And the user submits the form with its credentials

@SyntheticTrx @utilityCredits
Scenario: Allocate a single credit
    Given the user has created a new organization with name "Credits_test_SC01"
    When the user allocates "1" credits entitlement with email "testuser20@rockwellautomation.com" and valid for "365" days 
    Then the user should see "1" credit allocated to that organization

@SyntheticTrx @utilityCredits
Scenario: Allocate multiple credits
    Given the user has created a new organization with name "Credits_test_SC02"
    When the user allocates "1000000" credits entitlement with email "testuser20@rockwellautomation.com" and valid for "365" days 
    Then the user should see "1000000" credit allocated to that organization
@SyntheticTrx @utilityCredits
Scenario: Send a register with outdated timestamp or timestamp related to a different month than the current
    Given the user has created a new organization with name "Credits_Test_SC03"
    And the user allocates "100000" credits entitlement with email "testuser20@rockwellautomation.com" and valid for "365" days
    And the user has provisioned Foo service
    When the user consumes Foo service with a date from the past month
    Then the user should see the consumption is not carried out

@SyntheticTrx @utilityCredits
Scenario: Allocate an expired entitlement
    Given the user has created a new organization with name "Credits_Test_SC04"
    And the user has purchased an entitlement that already has expired
    When the user tries to allocate the credits entitlement
    Then the user should see "0" credit allocated to that organization
@SyntheticTrx @utilityCredits
Scenario: Renew expiry date by purchasing new utility credits
    Given the user has created a new organization with name "Credits_Test_SC05"
    And the user has purchased an entitlement that is about to expire
    When the user purchases new utility credits
    Then the users should see all their utility tokens have the expiry date updated to the last acquisition
@SyntheticTrx @utilityCredits
Scenario: Renew expiry date allocating the utility credits
    Given the user has created a new organization with name "Credits_Test_SC06"
    And the user has purchased an entitlement that is about to expire
    When the user tries to allocate the credits entitlement
    And the user allocates "100000" credits entitlement with email "testuser20@rockwellautomation.com" and valid for "365" days
    Then the user should see the just allocated credits have expiry date of 1 year from that moment

@creditsConsumption
Scenario: Consume allocated credits Foo service
    Given the user has created a new organization with name "Consume_credits_SC07"
    And the user allocates "100000" credits entitlement with email "testuser20@rockwellautomation.com" and valid for "365" days
    And the user has provisioned Foo service
    When the user consumes the allocated credits for FOO service
    Then the user should see "2835.00" credits consumed