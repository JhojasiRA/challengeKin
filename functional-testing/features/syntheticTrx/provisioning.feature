Feature:  Provisioning

Background: Be on the Le Mans portal
    Given the user opens the Le Mans portal
    And the user submits the form with its credentials

@SyntheticTrx
Scenario: custom provisioning for Edge not completed 
    Given the user creates an organization
    And the user purchases an "eaasCode - EaaS" entitlement
    When user allocates the entitlement
    And user closes the browser and opens it again 
    Then user can see "Click To Provision" in Edge card in the dashboard

@SyntheticTrx 
Scenario: provisioning not navigable options
    Given the user creates an organization
    And the user purchases an "eaasCode - EaaS" entitlement
    When user allocates the entitlement
    Then user can see logo is not clickable

@SyntheticTrx 
Scenario: refreshing Edge Provisioning
    Given the user creates an organization
    And user purchases an "eaasCode - EaaS" entitlement
    When user allocates the entitlement
    And user refresh the page
    Then user can see the dashboard 






            
                                        
       