Feature: As an user, I want to create a new organization into Le Mans portal

Background:  Be on the Le Mans portal
    Given the user opens the Le Mans portal
    And the user submits the form with its credentials
@create @SyntheticTrx 
Scenario: Create Organization Sucessfully
    When the user goes inside to create organization option
    And the user submits the form with its information
    Then the user should see the message "Congratulations! You have created the organization test OrgRockwellAut successfully!"    

@createWithLogo @SyntheticTrx 
Scenario: Create Organization with logo organization Sucessfully
    When the user goes inside to create organization option
    And the user submits the form with its information and add an organization logo
    Then the user will see an organization with "image/png" logo

@cancel @SyntheticTrx 
Scenario: Cancel user creation 
    When the user goes inside to create organization option
    And the user submits the form with its name
    Then User should see a message pop up: "Changes will not be saved. Do you want to proceed?"
    And the user should see the "Home" page
    
@SyntheticTrx  
Scenario: Create private organization
    When the user goes inside to create organization option
    And the user submits the form with its information
    Then the user should see the message "Congratulations! You have created the organization test OrgRockwellAut successfully!"
    And user cant see the name in join organization option

@SyntheticTrx @after 
Scenario: Create public organization
    When the user goes inside to create organization option
    And the user submits the form with public organization information
    Then the user should see the message "Congratulations! You have created the organization test OrgRockwellAut successfully!"
    And user can see the "test OrgRockwellAut" in join organization option

@SyntheticTrx 
Scenario: Go back create organization details
    When the user goes inside to create organization option	
    And the user submits the info but then user goes back 
    Then user can see "Setup Your Organization" in organization details

@SyntheticTrx 
Scenario: Change Vault tile visibility to ON
    And the user creates a new organization with all service tiles with visibility "OFF"
    When user turns on Vault service visibility
    Then user should see the Vault service in home

@SyntheticTrx 
Scenario: Change Remote Access tile visibility to ON
    And the user creates a new organization with all service tiles with visibility "OFF"
    When user turns on Remote Access service visibility
    Then user should see the Remote Access Service in home

@SyntheticTrx 
Scenario: Change Design Studio Service tile visibility to ON.
    And the user creates a new organization with all service tiles with visibility "OFF"
    When user turns on Design Studio service visibility
    Then user should see the Design Studio service in home

@SyntheticTrx 
Scenario: Change Foo Service tile visibility to ON.
    And the user creates a new organization with all service tiles with visibility "OFF"   
    When user turns on Foo service visibility
    Then user should see the Foo service in home

@SyntheticTrx 
Scenario: Change Vault Service tile visibility to OFF.
    And the user creates a new organization with all service tiles with visibility "ON"
    When user turns off Vault service visibility
    Then user should not see the Vault service in home

@SyntheticTrx 
Scenario: Change Remote Access tile visibility to OFF.
    And the user creates a new organization with all service tiles with visibility "ON"
    When user turns off Remote Access service visibility
    Then user should not see the Remote Access Service in home

@SyntheticTrx 
Scenario: Change Design Studio Service tile visibility to OFF.
    And the user creates a new organization with all service tiles with visibility "ON"
    When the user turns off Design Studio Service visibility
    Then user should not see the Design Studio service in home

@SyntheticTrx 
Scenario: Change Foo Service tile visibility to OFF
    And the user creates a new organization with all service tiles with visibility "ON"
    When the user turns off Foo Service visibility
    Then user should see not the Foo service in home


		
