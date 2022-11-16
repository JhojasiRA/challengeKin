Feature:  entitlement types

Background: Be on the Le Mans portal
    Given the user opens the Le Mans portal
    And the user submits the form with its credentials

@SyntheticTrx @entitlements
Scenario: purchase add-on entitlement
    Given user purchases an "9545M-FTRARTPRORT21 - SecureRemoteAccess" entitlement
    When user allocates the entitlement
    Then user can see the "Add-Ons" type in the organization entitlements

@SyntheticTrx @entitlements
Scenario: purchase additive entitlement       
     Given user purchases an "9317C-FTVPRMT22 - Vault" entitlement
     When user allocates the entitlement
     Then user should see the "Additive" type in the organization entitlements

@SyntheticTrx @entitlements
Scenario: purchase platform entitlement       
    Given user creates an organization
    And user purchases an "9324C-FTDSBAST11 - IDE" entitlement
    When user allocates the entitlement
    Then user can see the "Platform" in the organization entitlements

@SyntheticTrx @entitlements
Scenario: purchase utilityCredit entitlement       
     Given user purchases an "9317C-FLEXCRT12 - " entitlement
     When user allocates the entitlement
     Then user can see "Utility Token" type in the organization entitlements

@PartialAllocation
Scenario: Allocate utilityCredits in the range values
    Given user purchases an "9317C-FLEXCRT12 - " entitlement
    When user allocates "333" credits
    Then the user should see the "Invite User" bread Crumb
    

Scenario: Allocate a negative utilityCredit number
    Given user purchases an "9317C-FLEXCRT12 - " entitlement
    When user allocates "-3" credits
    
@PartialAllocation
Scenario: Allocate higher number
    Given user purchases an "9317C-FLEXCRT12 - " entitlement
    When user allocates "1333" credits
    Then user should not be able to allocate it "This value cannot be greater than 1000"


Scenario: Allocate zero utilityCredits
    Given user purchases an "9317C-FLEXCRT12 - " entitlement
    When user allocates "0" credits


Scenario: Allocate a decimal utilityCredit number
    Given user purchases an "9317C-FLEXCRT12 - " entitlement
    When user allocates "10.5" credits


Scenario: purchase two platform entitlement       
    Given user creates an organization
    And user purchases an "9324C-FTDSBAST11 - IDE" entitlement
    When user allocates the entitlement
    And user tries to purchase another "9324C-FTDSBAST11 - IDE" entitlement
    Then user should see "Service already has a platform entitlement allocated for the time period" message

Scenario: purchase many addons entitlement       
    Given user creates an organization
    And user purchases an "9545M-FTRARTPRORT21 - SecureRemoteAccess" entitlement
    When user allocates the entitlement
    And user tries to purchase another "9545M-FTRARTPRORT21 - SecureRemoteAccess" entitlement
    Then user can see the "Add-Ons" type in the organization entitlements

Scenario: purchase platform and addons entitlements     
    Given user creates an organization
    And user purchases an "9324C-FTDSBAST11 - IDE" entitlement
    When user allocates the entitlement
    And user tries to purchase another "9545M-FTRARTPRORT21 - SecureRemoteAccess" entitlement
    Then user can see the "Add-Ons" type in the organization entitlements








            
                                        
       