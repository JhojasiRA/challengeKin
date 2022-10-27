Feature: Edit Organization

Background: Be on the Le Mans portal
    Given the user opens the Le Mans portal
    When the user submits the form with its credentials
    
@addNewLogo @SyntheticTrx @editOrg
Scenario: Add a new organization Logo 
    When the user goes inside to edit organization option
    And the user adds a new logo organization
    Then the user will see a new "image/png" logo organization

@afterEditOrganization @SyntheticTrx @editOrg
Scenario: Edit Organization info successfully
    When the user goes inside to edit organization option
    And the user submits the form with new information
    Then the user will see the message "Organization updated successfully."

@editLogo @SyntheticTrx @editOrg
Scenario: Edit Organization logo successfully
    When the user goes inside to edit organization option
    And the user edits the logo organization
    Then the user will see an organization with "image/png" logo
    
@cancelEdit @SyntheticTrx @editOrg
Scenario: Cancel edit organization info
    When the user goes inside to edit organization option
    And the user changes the description but then cancel the edition
    Then User should see a message pop up: "Changes will not be saved. Do you want to proceed?"
    And the user should see the "All Apps" page

@newInviteCode @SyntheticTrx @editOrg
Scenario: Generate a new invite code
    When the user goes inside to edit organization option
    And User generates a new invide code
    Then User will see a success message and will be able to close it

@SyntheticTrx @editOrg
Scenario: Edit private organization
    When the user goes inside to edit organization option
    And the user edits the form 
    Then the user will see the message "Organization updated successfully."
    And user can see the "TestingOrgRockwell1" in join organization option
 
@SyntheticTrx @editOrg
Scenario: Edit public organization
    When the user goes inside to edit organization option
    And the user edits the info of the form 
    Then the user will see the message "Organization updated successfully."
    And user cant see the name in join organization option 




