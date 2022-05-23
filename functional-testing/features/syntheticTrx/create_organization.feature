Feature: As an user, I want to create a new organization into Le Mans portal

Background:  Be on the Le Mans portal
    Given the user open the Le Mans portal
    When the user submit the form with its credentials
@create @SyntheticTrx 
Scenario: Create Organization Sucessfully
    When the user go inside to create organization option
    And the user submit the form with its information
    Then the user should see the message "You have created the organization successfully!"
@addNewLogo @SyntheticTrx
Scenario: Add a new organization Logo
    When the user go inside to edit organization option
    And the user add a new logo organization
    Then the user will see a new "image/png" logo organization
@createWithLogo @SyntheticTrx
Scenario: Create Organization with logo organization Sucessfully
    When the user go inside to create organization option
    And the user submit the form with its information and add an organization logo
    Then the user will see an organization with "image/png" logo
@cancel @SyntheticTrx
Scenario: Cancel user creation
    When the user go inside to create organization option
    And the user submit the form with its name
    Then User should see a message pop up: "Changes will not be saved. Do you want to proceed?"
    And the user should see the "Home" page
@edit @afterEditOrganization @SyntheticTrx
Scenario: Edit Organization info successfuly
    When the user go inside to edit organization option
    And the user submit the form with new information
    Then the user will see the message "You have edited the organization successfully!"
@editLogo @SyntheticTrx
Scenario: Edit Organization logo successfuly
    When the user go inside to edit organization option
    And the user edits the logo organization
    Then the user will see a new "iVBORw" logo
@cancelEdit @SyntheticTrx
Scenario: Cancel edit organization info
    When the user go inside to edit organization option
    And the user changes the description but then cancel the edition
    Then User should see a message pop up: "Changes will not be saved. Do you want to proceed?"
    And the user should see the "Home" page
@newInviteCode @SyntheticTrx
Scenario: Generate a new invite code
    When the user go inside to edit organization option
    And User generate a new invide code
    Then User will see a success message and will be able to close it