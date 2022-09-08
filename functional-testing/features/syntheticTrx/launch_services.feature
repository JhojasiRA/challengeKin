Feature: As a user, I want to launch vault into Le Mans portal

    Background:  Be on the Le Mans portal
        Given the user opens the Le Mans portal
        When the user logs in with MyRockwell-SAML
        And the user accepts the EULA testing eula "false"

    @LaunchServices @SyntheticTrx
    Scenario: Launch vault into Home page
        When the user launches the vault card
        Then the user should see the "Vault" page of controller project

    @LaunchServices
    Scenario: sign out vault and homepage
        When the user launches the vault card
        And the user signs out the home page
        Then the user should see logout page

    @LaunchServices
    Scenario: Launch FTRA service without entitlement
        When the user launches the FTRA card
        Then the user does not have access to the FTRA service

    #Trial entitlement is applied by default
    #@LaunchServices @SyntheticTrx @teardownAddEntitlement
    #Scenario: Launch FTRA service with entitlement
    #    Given the user has created a new organization with name "FTRA_entitlement_test"
    #    And the user has allocated a new FTRA entitlement with email "rasynthetictest@rockwellautomation.com" and valid for "5" days
    #    When the user launches the FTRA card
    #    Then the user sees page with the title "Operation Hub"

    @LaunchServices @SyntheticTrx 
    Scenario: Launch Foo service without entitlement
        When the user launches the Foo card
        Then the user does not have access to the Foo service

    @LaunchServices @SyntheticTrx 
    Scenario: Launch Fiix service
        When the user launches the Fiix card
        Then the user sees page with the title "The #1 maintenance management software to plan, track, and optimize your maintenance"

    #TODO: Waiting for CLI-Tool in sandbox for being a feasible scenario
    # @LaunchServices @SyntheticTrx
    #  Scenario: Launch Foo service with entitlement
    #       When the user launches the Foo card
    #      Then the user sees page with the title "Foo title page placeholder"

@LaunchServices @SyntheticTrx
    Scenario: Launch Optix service
        When the user launches the FTOptix card
        Then the user sees page with the title "FT Optix"

   @LaunchServices @SyntheticTrx
    Scenario: Launch EaaS service without entitlement
       When the user launches the EaaS card
       Then the user sees page with the title "ZedControl"