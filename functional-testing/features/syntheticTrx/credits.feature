Feature: As a user, I want to purchase and allocate utility credits to my organizations so users belonging to this organizations be able to consume the different services provided by FactoryTalkHub

Background:  Be on the Le Mans portal
    Given the user opens the Le Mans portal
    And the user submits the form with its credentials

Scenario: Allocate a single credits
    Given the user has created a new organization with name "Credits_test"
    When the user allocates "1" credits entitlement with email "testuser20@rockwellautomation.com" and valid for "365" days 
    Then the user should see "1" credit allocated to that organization


Scenario: Allocate multiple credits
    Given the user has created a new organization with name "Credits_test"
    When the user allocates "1000000" credits entitlement with email "testuser20@rockwellautomation.com" and valid for "365" days 
    Then the user should see "1000000" credit allocated to that organization

 #Given the user has created a new organization with name "Credits_test_register_outdated"
  #  And the user allocates "100000" credits entitlement with email "testuser20@rockwellautomation.com" and valid for "365" days
@testing
Scenario: Send a register with outdated timestamp or timestamp related to a different month than the current
    When the user consumes Foo service with a date from the past month
    Then the user should see the consumption is not carried out

Scenario: Purchase a entitlement valid for 1 day and try to allocate the next day

Scenario: Renew expiry date by purchasing new utility tokens

Scenario: Renew expiry date allocating the utility token