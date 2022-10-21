Feature:  As a user, I want to purchase and allocate fake entitlements 

Background: Be on the Le Mans portal
    Given the user opens the Le Mans portal
    And the user submits the form with its credentials

@SyntheticTrx 
Scenario: purchase add-on entitlement
    Given user purchases an "9545M-FTRARTPRORT21 - SecureRemoteAccess" entitlement
    When user allocates the entitlement
    Then user can see the "Add-Ons" type in the organization entitlements


@SyntheticTrx 
Scenario: purchase additive entitlement       
     Given user purchases an "9317C-FTVPRMT22 - Vault" entitlement
     When user allocates the entitlement
     Then user should see the "Additive" type in the organization entitlements

@SyntheticTrx 
Scenario: purchase utilityToken entitlement       
     Given user purchases an "9523-UtilityToken -" entitlement
     When user allocates the entitlement
     Then user can see "Utility Token" type in the organization entitlements

@SyntheticTrx 
Scenario: purchase platform entitlement       
    Given user creates an organization
    And user purchases an "9324C-FTDSBAST11 - IDE" entitlement
    When user allocates the entitlement
    Then user can see the "Platform" in the organization entitlements




            
                                        
       