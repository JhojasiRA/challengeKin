Feature: As a user, I want to launch vault into Le Mans portal

    Background:  Be on the Le Mans portal
        Given the user open the Le Mans portal
        When the user submit the form with its credentials
        And the user accept the EULA testing eula "false"

    @LaunchServices @SyntheticTrx 
    Scenario: Launch vault into Home page
        When the user launch the vault card
        Then the user should see the "Vault" page of controller project

    @LaunchServices @SyntheticTrx
    Scenario: sign out vault and homepage
        When the user launch the vault card
        And the user sign out the home page
        Then the user should see logout page
    @LaunchServices @SyntheticTrx 
    Scenario: Launch FTRA service without entitlement
        When the user launch the FTRA card
        Then the user does not have access to the FTRA service

#TODO: Waiting for CLI-Tool in sandbox for being a feasible scenario 
# @LaunchServices @SyntheticTrx
#  Scenario: Launch FTRA service with entitlement
#       When the user launch the FTRA card
#      Then the user see page with the title "FTRA title page placeholder"

    @LaunchServices @SyntheticTrx
    Scenario: Launch Foo service without entitlement 
        When the user launch the Foo card
        Then the user does not have access to the Foo service

    @LaunchServices @SyntheticTrx
    Scenario: Launch EaaS service without entitlement
        When the user launch the EaaS card
        Then the user does not have access to the EaaS service    

    @LaunchServices @SyntheticTrx
    Scenario: Launch Fiix service
        When the user launch the Fiix card
        Then the user see page with the title "The #1 maintenance management software to plan, track, and optimize your maintenance"

#TODO: Waiting for CLI-Tool in sandbox for being a feasible scenario 
# @LaunchServices @SyntheticTrx
#  Scenario: Launch Foo service with entitlement
#       When the user launch the Foo card
#      Then the user see page with the title "Foo title page placeholder"

    @LaunchServices @SyntheticTrx
    Scenario: Launch UNIQO service
        When the user launch the UNIQO card
        Then the user see page with the title "UNIQO title page placeholder"

#TODO: Waiting for CLI-Tool in sandbox for being a feasible scenario 
#    @LaunchServices @SyntheticTrx
#    Scenario: Launch EaaS service with entitlement
#        When the user launch the EaaS card
#        Then the user see page with the title "EaaS title page placeholder"